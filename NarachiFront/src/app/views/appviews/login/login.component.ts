import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Login } from '../../../models/Login';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: 'login.template.html'
})
export class LoginComponent {

  public UserLogin = new Login();
  LoginFailed = false;


  constructor(private authService: AuthenticationService, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
  }

  Login() {
    this.authService.login(this.UserLogin).subscribe(us => {
      this.router.navigate(['Home']);


    },

      error => {
        this.LoginFailed = true;
      }

    );
  }




}
