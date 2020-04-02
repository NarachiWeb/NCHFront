import { Component } from '@angular/core';
import { RecordService } from '../../../services/record.service';
import { TipoDeRegistro } from '../../../models/TipoDeRegistro';

@Component({
  selector: 'addrecord',
  templateUrl: 'addrecord.template.html'
})
export class AddRecordComponent {

  TipoRegistro = new Array<TipoDeRegistro>();

  constructor(private recordService: RecordService) {
  }

  ngOnInit() {
    this.getTipos();
  }

  getTipos() {

    this.recordService.GetTypeOfRecords().subscribe(us => {


      var Result = JSON.parse(us.text());
      this.TipoRegistro = <TipoDeRegistro[]>Result;

    });

  }


}
