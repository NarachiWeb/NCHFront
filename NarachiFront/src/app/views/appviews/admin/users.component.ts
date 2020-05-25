import { Component } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../models/Usuario';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'users',
  templateUrl: 'users.template.html'
})


export class UsersComponent {

  Usuarios = new Array<Usuario>();
  User = new Usuario();

  constructor(private notificationService: NotificationService, private userService: UserService, private appService: AppService) {
  }

  ngOnInit() {

    this.getUsers();
  }

  getUsers() {
    this.userService.list().subscribe(us => {

      var Result = JSON.parse(us.text());

      this.Usuarios = <Usuario[]>Result;

    });

    
  }

  setFecha(date: Date) {
    return this.appService.transformFecha(date);
  }

  getAge(date: Date) {
    return this.appService.getAgeByDate(date);
  }


}
