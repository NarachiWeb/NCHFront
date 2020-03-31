import { Injectable } from '@angular/core';
import { JwtService } from '../Jwt/jwt.service';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import { Registro } from '../models/Registro';



@Injectable()
export class RecordService {

    private _GetTypeOfRecords = "https://localhost:44312/api/Registro/TypesOfRecords"
    private _AddRecord = "https://localhost:44312/api/Registro/Add";
    private _GetRecordsByType = "https://localhost:44312/api/Registro/GetRecordsByType";
    private _List = "https://localhost:44312/api/Registro/List";
    private _GetMyRecordsByChampion = "https://localhost:44312/api/Registro/GetMyRecordsByChampion";
    private _UpdateRecord = "https://localhost:44312/api/Registro/Update";
    private _DeleteRecord = "https://localhost:44312/api/Registro/Delete";

    constructor(private jwtService: JwtService) {
    }

    public GetTypeOfRecords(): Observable<Response> {
        return this.jwtService.get(this._GetTypeOfRecords);
    }

    public SaveRecord(record: Registro): Observable<Response> {
        return this.jwtService.post(this._AddRecord, record);
    }

    public GetRecordsByType(Tipo: string): Observable<Response> {
        return this.jwtService.get(this._GetRecordsByType + "?Tipo=" + Tipo);
    }

    public List(): Observable<Response> {
        return this.jwtService.get(this._List);
    }

    public GetMyRecordsByChampion(Id: string): Observable<Response> {
        return this.jwtService.get(this._GetMyRecordsByChampion + "?Id=" + Id);
    }

    public UpdateRecord(Registro: Registro): Observable<Response> {
        return this.jwtService.put(this._UpdateRecord, Registro);
    }

    public DeleteRecord(Id: string): Observable<Response> {
        return this.jwtService.delete(this._DeleteRecord + "?Id=" + Id);
    }
}
