import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../models/Usuario';
import { DatePipe } from '@angular/common';

export class ChangePassword {
  Password: string;
  PasswordNew: string;
  Repeat: string;
}

@Component({
  selector: 'profile',
  templateUrl: 'profile.template.html'
})
export class ProfileComponent {

  Usuario = new Usuario();
  Page: boolean = true;
  Edit: boolean = false;
  User = new ChangePassword();


  Generos: any[] = [{ "Id": 0, "Nombre": "Masculino" }, { "Id": 1, "Nombre": "Femenino"}];


  constructor(private userService: UserService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    var User = JSON.parse(localStorage.getItem('profile'));
    this.Usuario = <Usuario>User;
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

  openEdit() {
    this.Page = false;
    this.Edit = true;
  }

  closeEdit() {
    this.Page = true;
    this.Edit = false;
    this.getProfile();
  }

  saveUser() {
    this.userService.updateUser(this.Usuario).subscribe(us => {

      localStorage.removeItem('profile');
      localStorage.setItem('profile', JSON.stringify(this.Usuario));
    

    });
  }

  processFile(imageInput: any) {
    if (imageInput.files && imageInput.files[0]) {
      const file: File = imageInput.files[0];
      const reader = new FileReader();

      let okExtension = false;
      const extensionesValidas = ['jpg', 'png'];
      const extension = imageInput.files[0].name.split('.').pop();

      extensionesValidas.forEach(function (ext) {
        if (ext == extension) {
          okExtension = true;
          return;
        }
      });

      if (okExtension) {
        reader.onload = event => {
          let result = (<FileReader>event.target).result;
          if ((<FileReader>event.target).result) {
            this.Usuario.Avatar = 'data:image/png;base64,' + btoa(<string>result);
            }
        };
        reader.readAsBinaryString(file);
      }
    }
  }

  cameraButton(event) { }

  changePassword() {

    this.userService.changePassword(this.User).subscribe(us => { });


  }
}
