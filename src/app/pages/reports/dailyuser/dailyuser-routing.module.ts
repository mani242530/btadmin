import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailyUserComponent } from './dailyuser.component';

const routes: Routes = [
  {
    path: '',
    component: DailyUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyUserRoutingModule {}
