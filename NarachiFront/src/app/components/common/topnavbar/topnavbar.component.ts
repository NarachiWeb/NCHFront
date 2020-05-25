import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { AuthenticationService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AppService } from '../../../services/app.service';
import { Usuario } from '../../../models/Usuario';
import { JwtService } from '../../../jwt/jwt.service';
declare var jQuery:any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent {

  Usuario = new Usuario();
  

  constructor(private authService: AuthenticationService, private router: Router, private appService: AppService, private jwtService: JwtService) {

  }

  ngOnInit() {
    this.appService.getUsuario().subscribe(user => this.Usuario = user);
    this.getProfile();

  }

  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['login']);

  }

  getProfile() {
    var User = JSON.parse(localStorage.getItem('profile'));
    this.Usuario = <Usuario>User;

  }



}
