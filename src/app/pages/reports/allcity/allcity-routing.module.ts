import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCityComponent } from './allcity.component';

const routes: Routes = [
  {
    path: '',
    component: AllCityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllCityRoutingModule {}
