import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'apps',
    loadChildren: () => import('./apps/apps.module').then((m) => m.AppsModule),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./extraspages/extraspages.module').then(
        (m) => m.ExtraspagesModule
      ),
  },
  {
    path: 'ui',
    loadChildren: () =>
      import('./components/components.module').then((m) => m.ComponentsModule),
  },
  {
    path: 'extended',
    loadChildren: () =>
      import('./extended/extended.module').then((m) => m.ExtendedModule),
  },
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then((m) => m.FormModule),
  },
  {
    path: 'tables',
    loadChildren: () =>
      import('./tables/tables.module').then((m) => m.TablesModule),
  },
  {
    path: 'chart',
    loadChildren: () =>
      import('./chart/chart.module').then((m) => m.ChartModule),
  },
  {
    path: 'icons',
    loadChildren: () =>
      import('./icons/icons.module').then((m) => m.IconsModule),
  },
  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.module').then((m) => m.MapsModule),
  },
  {
    path: 'advertise',
    loadChildren: () =>
      import('./advertise/advertise.module').then((m) => m.AdvertiseModule),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
  },
  {
    path: 'sms',
    loadChildren: () => import('./sms/sms.module').then((m) => m.SmsModule),
  },
  {
    path: 'updates',
    loadChildren: () =>
      import('./updates/updates.module').then((m) => m.UpdatesModule),
  },
  {
    path: 'employee-list',
    loadChildren: () =>
      import('./employee-list/employee-list.module').then(
        (m) => m.EmployeeListModule
      ),
  },
  {
    path: 'employee-update',
    loadChildren: () =>
      import('./employee-update/employee-update.module').then(
        (m) => m.EmployeeUpdateModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
