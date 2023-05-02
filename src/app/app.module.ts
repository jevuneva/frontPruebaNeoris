import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { AccountComponent } from './account/account.component';
import { MovementComponent } from './movement/movement.component';
import { ReportsComponent } from './reports/reports.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from './services/client.service';
import { AccountService } from './services/account.service';
import { MovementsServiceService } from './services/movementsService.service';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    AccountComponent,
    MovementComponent,
    ReportsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    ClientService,
    AccountService,
    MovementsServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
