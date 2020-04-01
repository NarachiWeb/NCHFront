import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

import {StarterViewComponent} from "./starterview.component";

import {PeityModule } from '../../components/charts/peity';
import {SparklineModule } from '../../components/charts/sparkline';
import { LoginComponent } from "./login/login.component";
import { FormsModule } from "@angular/forms";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { JwtModule } from "../../jwt/jwt.module";
import { ProfileComponent } from "./profile/profile.component";
//import { DemoMaterialModule } from "../../material/material-module";

@NgModule({
  declarations: [
    StarterViewComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent
  ],
  imports: [
    JwtModule,
    BrowserModule,
    RouterModule,
    PeityModule,
    SparklineModule,
    FormsModule
    //DemoMaterialModule,

  ],
  exports: [
    StarterViewComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent

  ],
})

export class AppviewsModule {
}
