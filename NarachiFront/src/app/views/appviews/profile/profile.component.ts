import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../models/Usuario';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'profile',
  templateUrl: 'profile.template.html'
})
export class ProfileComponent {

  public Usuario = new Usuario();


  constructor(private userService: UserService, private datePipe: DatePipe, ) {
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
 
  transformFecha(FechaNacimiento: Date): string {
    return this.datePipe.transform(FechaNacimiento, "dd/MM/yyyy");
  }

  getAgeByDate(date: any): number {

    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age-- }
    return age;
  }

}
