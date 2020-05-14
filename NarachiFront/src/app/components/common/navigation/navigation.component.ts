import { Component } from '@angular/core';
import {Router} from '@angular/router';
import 'jquery-slimscroll';
import { Usuario } from '../../../models/Usuario';
import { AppService } from '../../../services/app.service';

declare var jQuery:any;

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.template.html'
})

export class NavigationComponent {

  
  Usuario = new Usuario();

  constructor(private router: Router, private appService: AppService) { }

  ngAfterViewInit() {
    jQuery('#side-menu').metisMenu();

    if (jQuery("body").hasClass('fixed-sidebar')) {
      jQuery('.sidebar-collapse').slimscroll({
        height: '100%'
      })
    }
  }

  ngOnInit() {
    this.appService.getUsuario().subscribe(user => this.Usuario = user);

    this.getProfile();
  }

  activeRoute(routename: string): boolean{
    return this.router.url.indexOf(routename) > -1;
  }

  getProfile() {
    var User = JSON.parse(localStorage.getItem('profile'));
    this.Usuario = <Usuario>User;
  }
}
