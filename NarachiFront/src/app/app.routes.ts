import {Routes} from "@angular/router";

import {Dashboard1Component} from "./views/dashboards/dashboard1.component";
import {Dashboard2Component} from "./views/dashboards/dashboard2.component";
import {Dashboard3Component} from "./views/dashboards/dashboard3.component";
import {Dashboard4Component} from "./views/dashboards/dashboard4.component";
import {Dashboard41Component} from "./views/dashboards/dashboard41.component";
import {Dashboard5Component} from "./views/dashboards/dashboard5.component";

import {StarterViewComponent} from "./views/appviews/starterview.component";

import {BlankLayoutComponent} from "./components/common/layouts/blankLayout.component";
import {BasicLayoutComponent} from "./components/common/layouts/basicLayout.component";
import {TopNavigationLayoutComponent} from "./components/common/layouts/topNavigationlayout.component";
import { LoginComponent } from "./views/appviews/login/login.component";
import { SignUpComponent } from "./views/appviews/sign-up/sign-up.component";
import { ProfileComponent } from "./views/appviews/profile/profile.component";
import { AddRecordComponent } from "./views/appviews/records/addrecord.component";
import { ListComponent } from "./views/appviews/records/list.component";

export const ROUTES:Routes = [
  // Main redirect
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  // App views
  {
    path: 'dashboards', component: BasicLayoutComponent,
    children: [
      {path: 'dashboard1', component: Dashboard1Component},
      {path: 'dashboard2', component: Dashboard2Component},
      {path: 'dashboard3', component: Dashboard3Component},
      {path: 'dashboard4', component: Dashboard4Component},
      {path: 'dashboard5', component: Dashboard5Component}
    ]
  },
  {
    path: 'dashboards', component: TopNavigationLayoutComponent,
    children: [
      {path: 'dashboard41', component: Dashboard41Component}
    ]
  },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      {path: 'home', component: StarterViewComponent}
    ]
  },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      { path: 'profile', component: ProfileComponent }
    ]
  },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'sign-up', component: SignUpComponent },
    ]
  },
  {
    path: 'records', component: BasicLayoutComponent,
    children: [
      { path: 'add', component: AddRecordComponent },
      { path: 'list', component: ListComponent },
      { path: 'dashboard3', component: Dashboard3Component },
      { path: 'dashboard4', component: Dashboard4Component },
      { path: 'dashboard5', component: Dashboard5Component }
    ]
  },

   //Handle all other routes
  {path: '**',  redirectTo: 'home'}
];
