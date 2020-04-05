import { Component } from '@angular/core';
import { RecordService } from '../../../services/record.service';
import { Registro } from '../../../models/Registro';

@Component({
  selector: 'list',
  templateUrl: 'list.template.html'
})
export class ListComponent {

  Registros: Registro[];


  constructor(private recordService: RecordService) {
  }

  ngOnInit() {
    this.getRecords();
  }

  getRecords() {
    this.recordService.List().subscribe(us => { var Result = JSON.parse(us.text()); this.Registros = <Registro[]>Result; });
  }




}
