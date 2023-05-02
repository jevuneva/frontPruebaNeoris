import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { ClientComponent } from './client/client.component';
import { MovementComponent } from './movement/movement.component';
import { ReportsComponent } from './reports/reports.component';



const routes: Routes = [
  { path: 'account', component: AccountComponent },
  { path: 'client', component: ClientComponent },
  { path: 'movements', component: MovementComponent},
  { path: 'reports', component: ReportsComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}