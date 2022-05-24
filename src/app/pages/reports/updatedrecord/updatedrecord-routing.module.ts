import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdatedRecordComponent } from './updatedrecord.component';

const routes: Routes = [
  {
    path: '',
    component: UpdatedRecordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatedRecordRoutingModule {}
