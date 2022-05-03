import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthlySaleComponent } from './monthlysale.component';

const routes: Routes = [
  {
    path: '',
    component: MonthlySaleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthlySaleRoutingModule {}
