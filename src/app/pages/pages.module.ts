import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CountToModule } from 'angular-count-to';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { LightboxModule } from 'ngx-lightbox';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { SharedModule } from '../shared/shared.module';
import { WidgetModule } from '../shared/widget/widget.module';
import { AppsModule } from './apps/apps.module';
import { ExtraspagesModule } from './extraspages/extraspages.module';
import { ComponentsModule } from './components/components.module';
import { ExtendedModule } from './extended/extended.module';
import { FormModule } from './form/form.module';
import { TablesModule } from './tables/tables.module';
import { ChartModule } from './chart/chart.module';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    WidgetModule,
    CountToModule,
    SharedModule,
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
    LeafletModule
  ]
})
export class PagesModule { }
