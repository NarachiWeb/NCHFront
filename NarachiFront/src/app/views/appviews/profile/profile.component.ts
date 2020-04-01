import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../models/Usuario';

@Component({
  selector: 'profile',
  templateUrl: 'profile.template.html'
})
export class ProfileComponent {

  public Usuario = new Usuario();


  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getMyProfile();
  }

  getMyProfile() {

    this.userService.getMyProfile().subscribe(us => {
      var result = JSON.parse(us.text());
      this.Usuario = <Usuario>result;
    });
  }
 



}
