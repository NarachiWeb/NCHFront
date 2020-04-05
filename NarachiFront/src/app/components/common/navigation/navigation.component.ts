import { Component } from '@angular/core';
import {Router} from '@angular/router';
import 'jquery-slimscroll';
import { Usuario } from '../../../models/Usuario';

declare var jQuery:any;

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.template.html'
})

export class NavigationComponent {

  
  Usuario = new Usuario();

  constructor(private router: Router) {}

  ngAfterViewInit() {
    jQuery('#side-menu').metisMenu();

    if (jQuery("body").hasClass('fixed-sidebar')) {
      jQuery('.sidebar-collapse').slimscroll({
        height: '100%'
      })
    }
  }

  ngOnInit() {
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
