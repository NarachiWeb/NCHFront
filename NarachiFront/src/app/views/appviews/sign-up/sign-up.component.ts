import { Component } from '@angular/core';
import { Usuario } from '../../../models/Usuario';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'sign-up',
  templateUrl: 'sign-up.template.html'
})
export class SignUpComponent {

  public Usuario = new Usuario();


  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }


  Registrarse() {
    this.userService.createUser(this.Usuario).subscribe(us => {



    });
  }



}
