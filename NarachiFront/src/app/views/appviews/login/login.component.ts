import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Login } from '../../../models/Login';

@Component({
  selector: 'login',
  templateUrl: 'login.template.html'
})
export class LoginComponent {

  public UserLogin = new Login();


  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  Login() {
    this.authService.login(this.UserLogin).subscribe(us => {
      this.router.navigate(['Home']);


    });
  }



}
