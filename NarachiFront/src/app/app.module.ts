import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from "@angular/router";
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {ROUTES} from "./app.routes";
import { AppComponent } from './app.component';
import 'hammerjs';
// App views
import {DashboardsModule} from "./views/dashboards/dashboards.module";
import {AppviewsModule} from "./views/appviews/appviews.module";

// App modules/components
import {LayoutsModule} from "./components/common/layouts/layouts.module";
import { AuthenticationService } from './services/auth.service';
import { AppService } from './services/app.service';
import { UserService } from './services/user.service';
import { JwtModule } from './jwt/jwt.module';
import { RecordService } from './services/record.service';
import { ChampionService } from './services/champion.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DashboardsModule,
    LayoutsModule,
    AppviewsModule,
    JwtModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [AuthenticationService, AppService, UserService, RecordService, ChampionService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
