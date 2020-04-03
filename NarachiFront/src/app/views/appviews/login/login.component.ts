import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/auth.service';
import { LoginUser, Usuario } from '../../../models/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: 'login.template.html'
})


export class LoginComponent {

  public Usuario = new Usuario();


  constructor(private authService: AuthenticationService, private router: Router) {

  }


  Login() {

    this.authService.login(this.Usuario).subscribe(us => {

      this.router.navigate(['Home']);



    });


  }


}
