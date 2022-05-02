import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeUpdateComponent } from './employee-update.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeUpdateRoutingModule {}
