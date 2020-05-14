import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Login } from '../models/Login';
import { map } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { AppService } from './app.service';

export interface IUser {
    Username: string;
    Password: string;
}

@Injectable()

export class AuthenticationService {
    public token: string;
    public Usuario: Usuario;

    constructor(private http: Http, private appService: AppService) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;

    }

    login(user: IUser): Observable<boolean> {

        //TODO configurar clientId y url
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
      
        return this.http.post('https://localhost:44312/api/Usuario/Login', user, options).map((response: Response) => {
            let res = JSON.parse(response.text());
           
                // login successful if there's a jwt token in the response
            let token = res && res.token;
            let user = res && res.user;
            let refreshToken = res && res.expiration;


                if (token) {

                    this.setToken(token, refreshToken);
                    this.setUser(user);

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    setToken(token, refreshToken) {
        this.token = token;
        localStorage.setItem('currentUser', JSON.stringify({ token: token, refreshToken: refreshToken }));

    }

    setUser(user) {
      var us = JSON.stringify(user);

      localStorage.setItem('profile', us);

      var usuario = JSON.parse(us);
      this.appService.setUsuario(usuario);

    }





    logOut(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('profile');
    }

    refreshToken(): Observable<boolean> {
        //TODO configurar clientId y url
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);

        let options = new RequestOptions({ headers: headers });
        let userActual = JSON.parse(localStorage.getItem('currentUser'));

        let body = new URLSearchParams();

        body.set('currentUser', userActual.username);
        //let user = <IUser>{
        //    userName: userActual.username
        //}
       
        return this.http.post("https://localhost:44312/api/Usuario/RefreshToken", { username: userActual.username }, options).pipe(map((response: Response) => {
            console.log('response', response);
            // login successful if there's a jwt token in the response
            let token = response.json() && response.json().Token;
            let refreshToken = response.json() && response.json().Expiration;


            if (token) {
                // set token property
                this.token = token;

                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username: userActual.username, token: token, refreshToken: refreshToken }));

                // return true to indicate successful login
                return true;
            } else {
                // return false to indicate failed login
                return false;
            }
        }));//...errors if)
            
       

    }

    isLoggedIn(): boolean { return this.token != null; }



}
