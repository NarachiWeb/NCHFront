import { Component } from '@angular/core';
import { RecordService } from '../../../services/record.service';
import { Registro } from '../../../models/Registro';
import { ChampionService } from '../../../services/champion.service';
import { Campeon } from '../../../models/Campeon';
import { TipoDeRegistro } from '../../../models/TipoDeRegistro';
declare var jQuery: any;

@Component({
  selector: 'list',
  templateUrl: 'list.template.html'
})
export class ListComponent {

  Registros: Registro[];
  Campeones = new Array<Campeon>();
  SelCampeon = new Campeon();
  SelEnemigo = new Campeon();
  Tipos = new Array<TipoDeRegistro>();
  TipoRegistro = new TipoDeRegistro();
  Show = true;

  constructor(private recordService: RecordService, private campeonService: ChampionService) {
  }

  ngOnInit() {
    this.getRecords();
    this.getChampions();
    this.getTypesOfRecords();
  }

  getRecords() {
    this.recordService.List().subscribe(us => { var Result = JSON.parse(us.text()); this.Registros = <Registro[]>Result; });
  }

  getChampions() {
    this.campeonService.List().subscribe(us => {

      var Result = JSON.parse(us.text());
      this.Campeones = <Campeon[]>Result;

    });
  }

  getTypesOfRecords() {
    this.recordService.GetTypeOfRecords().subscribe(us => {

      var Registros = JSON.parse(us.text());
      this.Tipos = <TipoDeRegistro[]>Registros;


    });
  }

  deleteRecord(record: Registro) {
    this.recordService.DeleteRecord(record.Id).subscribe(us => {

      this.Registros = this.Registros.filter(x => x.Id != record.Id);

    });
  }


  getRecordsByChampion() {
    this.recordService.GetMyRecordsByChampion(this.SelCampeon.Id).subscribe(us => {

      var Result = JSON.parse(us.text());

      this.Registros = <Registro[]>Result;

    });
  }

  getRecordsByEnemy() {
    this.recordService.GetMyRecordsByEnemy(this.SelEnemigo.Id).subscribe(us => {

      var Result = JSON.parse(us.text());

      this.Registros = <Registro[]>Result;

    });
  }

  getRecordsByType() {

    debugger;
    this.recordService.GetRecordsByType(this.TipoRegistro.Id).subscribe(us => {

      var Result = JSON.parse(us.text());

      this.Registros = <Registro[]>Result;


    });
  }


}
