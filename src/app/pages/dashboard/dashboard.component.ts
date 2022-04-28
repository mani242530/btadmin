import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import {
  walletOverview,
  investedOverview,
  marketOverview,
  walletlineChart,
  tradeslineChart,
  investedlineChart,
  profitlineChart,
  recentActivity,
  News,
  transactionsAll,
  transactionsBuy,
  transactionsSell,
} from './data';
import { ChartType } from './dashboard.model';
import { circle, latLng, tileLayer } from 'leaflet';
import { Company } from 'src/app/core/models/companys';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

/**
 *  Dashboard Component
 */
export class DashboardComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  title!: string;
  dataSource!: Object;
  walletOverview!: ChartType;
  investedOverview!: ChartType;
  marketOverview!: ChartType;
  walletlineChart!: ChartType;
  tradeslineChart!: ChartType;
  investedlineChart!: ChartType;
  profitlineChart!: ChartType;
  simplePieChart!: ChartType;
  donutChart!: ChartType;
  recentActivity: any;
  News: any;
  transactionsAll: any;
  transactionsBuy: any;
  transactionsSell: any;

  totalRegisteredUsers = 0;
  totalSupplier = 0;
  totalBooking = 0;
  totalDriverOwner = 0;
  totalActiveUsers = 0;
  totalInactiveUsers = 0;
  totalDriver = 0;
  totalOwner = 0;
  totalFrieghtForwarder = 0;
  totalPaidUsers999 = 0;
  totalPaidUsers99 = 0;
  totalNotPaidUsers = 0;
  totalPaidUsers = 0;

  company: any;
  getCompanys!: Observable<any>;
  companysCollection!: AngularFirestoreCollection<Company>;

  // Coin News Slider
  timelineCarousel: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    navText: ['', ''],
    dots: true,
    responsive: {
      680: {
        items: 4,
      },
    },
  };
  /**
   * Sale Location Map
   */
  options = {
    layers: [
      tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
        {
          id: 'mapbox/light-v9',
          tileSize: 512,
          zoomOffset: -1,
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        }
      ),
    ],
    zoom: 1.1,
    center: latLng(28, 1.5),
  };
  layers = [
    circle([41.9, 12.45], {
      color: '#435fe3',
      opacity: 0.5,
      weight: 10,
      fillColor: '#435fe3',
      fillOpacity: 1,
      radius: 400000,
    }),
    circle([12.05, -61.75], {
      color: '#435fe3',
      opacity: 0.5,
      weight: 10,
      fillColor: '#435fe3',
      fillOpacity: 1,
      radius: 400000,
    }),
    circle([1.3, 103.8], {
      color: '#435fe3',
      opacity: 0.5,
      weight: 10,
      fillColor: '#435fe3',
      fillOpacity: 1,
      radius: 400000,
    }),
  ];

  constructor(
    private fbstore: AngularFirestore,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Dashboard', active: true },
    ];

    /**
     * Fetches the data
     */
    this.fetchData();
  }

  /**
   * Fetches the data
   */
  private fetchData() {
    this.walletOverview = walletOverview;
    this.investedOverview = investedOverview;
    this.marketOverview = marketOverview;
    this.walletlineChart = walletlineChart;
    this.tradeslineChart = tradeslineChart;
    this.investedlineChart = investedlineChart;
    this.profitlineChart = profitlineChart;
    this.recentActivity = recentActivity;
    this.News = News;
    this.transactionsAll = transactionsAll;
    this.transactionsBuy = transactionsBuy;
    this.transactionsSell = transactionsSell;
    this.simplePieChart = this.firmActivityChart();
    this.donutChart = this.activeInactiveChart();
    try {
      this.spinner.show();
      this.companysCollection = this.fbstore.collection(
        'companys',
        (ref) => ref
      );
      this.getCompanys = this.companysCollection.snapshotChanges().pipe(
        map((actions) => {
          return actions.map((action) => {
            const data = action.payload.doc.data();
            return {
              id: action.payload.doc.id,
              paymentStatus: data.paymentStatus,
              accountStatus: data.accountStatus,
              firmActivity: data.firmActivity,
            };
          });
        })
      );

      this.getCompanys.subscribe((snapshot) => {
        this.spinner.hide();
        if (snapshot.length === 0) {
          this.totalRegisteredUsers = 0;
          this.totalSupplier = 0;
          this.totalBooking = 0;
          this.totalDriver = 0;
          this.totalOwner = 0;
          this.totalFrieghtForwarder = 0;
          this.totalInactiveUsers = 0;
          this.totalActiveUsers = 0;
          this.totalPaidUsers999 = 0;
          this.totalPaidUsers99 = 0;
          this.totalNotPaidUsers = 0;
        } else {
          this.totalRegisteredUsers = snapshot.length;

          this.totalSupplier = snapshot.filter(
            (obj: any) => obj.firmActivity === 'Supplier'
          ).length;

          this.totalBooking = snapshot.filter(
            (obj: any) => obj.firmActivity === 'Booking'
          ).length;

          this.totalFrieghtForwarder = snapshot.filter(
            (obj: any) => obj.firmActivity === 'Frieght Forwarder'
          ).length;

          this.totalDriver = snapshot.filter(
            (obj: any) => obj.firmActivity === 'Driver'
          ).length;

          this.totalOwner = snapshot.filter(
            (obj: any) => obj.firmActivity === 'Owner'
          ).length;

          this.totalActiveUsers = snapshot.filter(
            (obj: any) => obj.accountStatus === 'Active'
          ).length;

          this.totalInactiveUsers = snapshot.filter(
            (obj: any) => obj.accountStatus === 'Inactive'
          ).length;

          this.totalPaidUsers999 = snapshot.filter(
            (obj: any) => obj.firmActivity !== 'Driver'
          ).length;

          this.totalPaidUsers99 = snapshot.filter(
            (obj: any) => obj.firmActivity === 'Driver'
          ).length;

          this.totalNotPaidUsers = snapshot.filter(
            (obj: any) => obj.paymentStatus === 'Not Paid'
          ).length;

          this.totalPaidUsers = snapshot.filter(
            (obj: any) => obj.paymentStatus === 'Paid'
          ).length;

          this.simplePieChart = this.firmActivityChart();
          this.donutChart = this.activeInactiveChart();
        }
      });
    } catch (error) {
      this.spinner.hide();
      this.toastr.error('Something went wrong. Please check after some time!');
    }
  }
  /**
   * Fetches Firm Activity chart
   */
  firmActivityChart() {
    const simplePieChart: ChartType = {
      chart: { height: 320, type: 'pie' },
      series: [
        this.totalBooking,
        this.totalSupplier,
        this.totalDriver,
        this.totalOwner,
        this.totalFrieghtForwarder,
      ],
      labels: ['Booking', 'Supplier', 'Driver', 'Owner', 'FF'],
      colors: ['#2ab57d', '#5156be', '#fd625e', '#ffbf53', '#a6ef4b'],
      legend: {
        show: !0,
        position: 'bottom',
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        floating: !1,
        fontSize: '14px',
        offsetX: 0,
      },
      responsive: [
        {
          breakpoint: 600,
          options: { chart: { height: 240 }, legend: { show: !1 } },
        },
      ],
    };
    return simplePieChart;
  }
  /**
   * Fetches Firm Activity chart
   */
  activeInactiveChart() {
    const donutChart: ChartType = {
      chart: { height: 320, type: 'donut' },
      series: [this.totalActiveUsers, this.totalInactiveUsers],
      labels: ['Active', 'InActive'],
      colors: ['#2ab57d', '#fd625e'],
      legend: {
        show: !0,
        position: 'bottom',
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        floating: !1,
        fontSize: '14px',
        offsetX: 0,
      },
      responsive: [
        {
          breakpoint: 600,
          options: { chart: { height: 240 }, legend: { show: !1 } },
        },
      ],
    };
    return donutChart;
  }
}
