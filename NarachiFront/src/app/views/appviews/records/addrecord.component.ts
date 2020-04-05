import { Component } from '@angular/core';
import { RecordService } from '../../../services/record.service';
import { TipoDeRegistro, TipoRegistro } from '../../../models/TipoDeRegistro';
import { Campeon } from '../../../models/Campeon';
import { ChampionService } from '../../../services/champion.service';
import { Registro } from '../../../models/Registro';

@Component({
  selector: 'addrecord',
  templateUrl: 'addrecord.template.html'
})
export class AddRecordComponent {

  Tipos = new Array<TipoDeRegistro>();
  Campeones = new Array<Campeon>();
  List = new Array<Campeon>();
  Campeon: Campeon;
  Enemigo: Campeon;
  Registro = new Registro();
  Target: string;

  Success: boolean = false;
  Error: boolean = false;
  Galeria: boolean = false;
  Anotacion: boolean = false;
  ErrorConCampeon: boolean = false;
  ErrorContraCampeon: boolean = false;

  constructor(private recordService: RecordService, private ChampionService: ChampionService) {
  }

  ngOnInit() {

    this.getTypes();

  }

 

  getTypes() {
    this.recordService.GetTypeOfRecords().subscribe(

      us => {

        var Result = JSON.parse(us.text());
        this.Tipos = <TipoDeRegistro[]>Result;

      }

    );

  }

  getChampions() {
    this.ChampionService.List().subscribe(us => {

      var Result = JSON.parse(us.text());
      this.Campeones = <Campeon[]>Result;
      this.List = this.Campeones;

    });
  }

  open(Type: string) {

    this.getChampions();

    if (TipoRegistro.Anotacion == Type) {
      this.Anotacion = true;
      this.Registro.TipoDeRegistro = TipoRegistro.Anotacion;
    }

    if (TipoRegistro.ErrorConCampeon == Type) {
      this.ErrorConCampeon = true;
      this.Registro.TipoDeRegistro = TipoRegistro.ErrorConCampeon;

    }

    if (TipoRegistro.ErrorContraCampeon == Type) {
      this.ErrorContraCampeon = true;
      this.Registro.TipoDeRegistro = TipoRegistro.ErrorContraCampeon;

    }

  }

  cancel() {
    this.Anotacion = false;
    this.ErrorConCampeon = false;
    this.ErrorContraCampeon = false;
    this.Galeria = false;
    this.Campeon = null;
    this.Enemigo = null;
    this.Registro = new Registro();
    this.Success = false;
    this.Error = false;
  }

  

  public onChange(event): void {  // event will give you full breif of action
   
    const newVal = event.target.value;
    var camp = this.Campeones;

    if (newVal == "Todo")
      this.List = camp;

    this.List = this.Campeones.filter(x => x.Roles.Nombre == newVal);
  }

  selectChampion(campeon: Campeon) {

  

    this.Campeon = campeon;
    this.Registro.CampeonId = this.Campeon.Id;

    this.Galeria = false;
  }


  selectErrorContraCampeon(champion: Campeon, target: string) {
    debugger;
    if (target == "Campeon") {
      this.Campeon = champion;
      this.Registro.CampeonId = this.Campeon.Id;

    }

    if (target == "Enemigo") {
      this.Enemigo = champion;
      this.Registro.EnemigoId = this.Enemigo.Id;

    }

    this.Galeria = false;
  }


  changeChampion() {
    this.Galeria = true;
  }

  newRecord() {

    this.Success = false;
    this.Error = false;

    this.recordService.SaveRecord(this.Registro).subscribe(
      us => {

      this.Registro.Error = null;
        this.Success = true;
        const self = this;
        setTimeout(function () { self.Success = false; }, 3000);
            },
      error => {
        this.Error = true;

        const self = this;
        setTimeout(function () { self.Error = false; }, 3000);

      }

    );
    

  }


}
