import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CountToModule } from 'angular-count-to';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LightboxModule } from 'ngx-lightbox';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SimplebarAngularModule } from 'simplebar-angular';
import { SharedModule } from '../shared/shared.module';
import { WidgetModule } from '../shared/widget/widget.module';
import { AdvertiseModule } from './advertise/advertise.module';
import { AppsModule } from './apps/apps.module';
import { ChartModule } from './chart/chart.module';
import { ComponentsModule } from './components/components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeModule } from './employee/employee.module';
import { UpdatesModule } from './updates/updates.module';
import { ExtendedModule } from './extended/extended.module';
import { ExtraspagesModule } from './extraspages/extraspages.module';
import { FormModule } from './form/form.module';
import { PagesRoutingModule } from './pages-routing.module';
import { SmsModule } from './sms/sms.module';
import { TablesModule } from './tables/tables.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    WidgetModule,
    CountToModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    PagesRoutingModule,
    SimplebarAngularModule,
    CarouselModule,
    FeatherModule.pick(allIcons),
    RouterModule,
    NgbDropdownModule,
    NgbNavModule,
    AppsModule,
    ExtraspagesModule,
    ComponentsModule,
    ExtendedModule,
    LightboxModule,
    FormModule,
    TablesModule,
    ChartModule,
    LeafletModule,
    NgxSpinnerModule,
    EmployeeModule,
    SmsModule,
    AdvertiseModule,
    UpdatesModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }), // ToastrModule added
  ],
})
export class PagesModule {}
