import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthlyUserComponent } from './monthlyuser.component';

const routes: Routes = [
  {
    path: '',
    component: MonthlyUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthlyUserRoutingModule {}
