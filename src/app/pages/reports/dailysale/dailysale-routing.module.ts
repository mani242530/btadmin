import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailySaleComponent } from './dailysale.component';

const routes: Routes = [
  {
    path: '',
    component: DailySaleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailySaleRoutingModule {}
