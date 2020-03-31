import { Injectable } from '@angular/core';
import { JwtService } from '../Jwt/jwt.service';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Campeon } from '../models/Campeon';



@Injectable()
export class ChampionService {

    private _getChampions = "https://localhost:44312/api/Campeon/List";
    private _updateChampion = "https://localhost:44312/api/Campeon/Update";

    constructor(private _jwt: JwtService) {

    }

    ngOnInit() {
        
    }
    public List(): Observable<Response> {
        return this._jwt.post(this._getChampions, null);
    }

    public UpdateChampion(champion: Campeon): Observable<Response> {
        return this._jwt.put(this._updateChampion, champion);
    }
}
