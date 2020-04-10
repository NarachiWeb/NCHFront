import { Component } from '@angular/core';
import { RecordService } from '../../../services/record.service';
import { TipoDeRegistro, TipoRegistro } from '../../../models/TipoDeRegistro';
import { Campeon } from '../../../models/Campeon';
import { ChampionService } from '../../../services/champion.service';
import { Registro } from '../../../models/Registro';
import { RolesService } from '../../../services/roles.service';
import { RolesDeCampeon } from '../../../models/RolesDeCampeon';

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
  Roles: RolesDeCampeon[];
  Rol: RolesDeCampeon;
  Target: string;

  Success: boolean = false;
  Error: boolean = false;
  Galeria: boolean = false;
  Anotacion: boolean = false;
  ErrorConCampeon: boolean = false;
  ErrorContraCampeon: boolean = false;
  Search: string;
  constructor(private recordService: RecordService, private ChampionService: ChampionService, private rolesService: RolesService) {
  }

  ngOnInit() {

    this.getTypes();
    this.getRoles();

  }

  getRoles() {
    this.rolesService.getRoles().subscribe(us => {

      var Result = JSON.parse(us.text());
      this.Roles = <RolesDeCampeon[]>Result;

      var Rol: RolesDeCampeon = { Id: null, Nombre: 'Todos', Descripcion: null, FechaCreacion: null, FechaModificacion: null };
      this.Roles.push(Rol);

      this.Roles.sort((a, b) => (a > b ? 1 : -1));
      this.Rol = Rol;
    });
    
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
    this.Search = "";
  }

  

  public onChange(): void {  // event will give you full breif of action
    debugger;
    if (this.Rol.Nombre == "Todos") {
      this.List = this.Campeones;
    }
    else {
      this.List = this.Campeones.filter(x => x.RolId == this.Rol.Id);
    }
  }

  selectChampion(campeon: Campeon) {

  

    this.Campeon = campeon;
    this.Registro.CampeonId = this.Campeon.Id;

    this.Galeria = false;
  }


  selectErrorContraCampeon(champion: Campeon, target: string) {

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

  filterSearch() {
    this.List = this.filterByValue(this.Campeones, this.Search);
  }

  filterByValue(array, string) {
    if (this.Rol.Nombre == "Todos") {
      return array.filter((data) => JSON.stringify(data.Nombre).toLowerCase().indexOf(string.toLowerCase()) !== -1);
    }
    else {
      debugger;
      return array.filter((data) => JSON.stringify(data.Nombre).toLowerCase().indexOf(string.toLowerCase()) !== -1 && data.RolId == this.Rol.Id);
    }
   }


}
