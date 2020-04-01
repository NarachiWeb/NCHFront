import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { JwtService } from '../jwt/jwt.service';
import { Usuario } from '../models/Usuario';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

    private _userCreate = "https://localhost:44312/api/Usuario/Add";
    private _getMyProfile = "https://localhost:44312/api/Usuario/MyProfile";
    private _updateUser = "https://localhost:44312/api/Usuario/Update";


    constructor(private http: Http, private _jwt: JwtService ) {

    }

    createUser(user: Usuario): Observable<Response> {
        return this.http.post(this._userCreate, user);
    }

    getMyProfile(): Observable<Response> {
        return this._jwt.get(this._getMyProfile);
    }

    updateUser(user: Usuario): Observable<Response> {
        return this._jwt.put(this._updateUser, user);
    }
} 
