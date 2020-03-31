import { Injectable } from "@angular/core";
import { Usuario } from "../models/Usuario";
import { BehaviorSubject, Subject, Observable } from "rxjs";

@Injectable()
export class AppService {

    private Usuario = new BehaviorSubject<Usuario>(new Usuario());



    constructor() {

    }

    setUsuario(user: Usuario) {
        return this.Usuario.next(user);
    }

    getUsuario(): Observable<Usuario> {

        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let token = currentUser && currentUser.token;

        return this.Usuario;
    }

    removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject = {};

        for (var i in originalArray)
            lookupObject[originalArray[i][prop]] = originalArray[i];

        for (i in lookupObject)
            newArray.push(lookupObject[i]);

        return newArray;
    }

}
