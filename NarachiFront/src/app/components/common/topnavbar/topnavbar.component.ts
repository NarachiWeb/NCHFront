import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { AuthenticationService } from '../../../services/auth.service';
import { Router } from '@angular/router';
declare var jQuery:any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent {

  constructor(private authService: AuthenticationService, private router: Router) {

  }
  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['login']);

  }

}
