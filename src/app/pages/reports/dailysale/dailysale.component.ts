import { DecimalPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  usersSortableDirective,
  SortEvent,
} from './dailysale-sortable.directive';
import { DailySale } from './dailysale.model';
import { DailySaleService } from './dailysale.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dailysale',
  templateUrl: './dailysale.component.html',
  styleUrls: ['./dailysale.component.scss'],
  providers: [DailySaleService, DecimalPipe],
})

/**
 * DailySale Component
 */
export class DailySaleComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  @ViewChildren(usersSortableDirective)
  headers!: QueryList<usersSortableDirective>;

  hideme: boolean[] = [];
  tables$!: Observable<DailySale[]>;
  total$!: Observable<number>;

  company: any;
  getCompanys!: Observable<any>;
  companysCollection!: AngularFirestoreCollection<DailySale>;

  tableData!: DailySale[];
  totalData!: number;

  // All City Filter form
  dailySaleForm!: FormGroup;

  // Form submition
  submit!: boolean;
  formsubmit!: boolean;
  submitted = false;
  valueUpdated = false;
  locations: string[] = [];

  showTable = false;
  norecordFound = false;
  exportActive: boolean = false;

  selectedDefaultLocation = 'All';
  selectedDefaultDate = new Date().toISOString().slice(0, 10);
  selectedDefaultFirmActivity = 'All';
  selectedDefaultPaymentStatus = 'All';

  columnsToDisplay = [
    'location',
    'payment_date',
    'companyName',
    'firmActivity',
    'mobileNumber',
    'paymentStatus',
    'payment_date',
    'registeredDate',
    'updatedDate',
    'referenceName',
  ];

  @ViewChild('TABLE')
  table!: ElementRef;

  selectedAll = 'All';
  selectedDate = new Date().toISOString().slice(0, 10);
  firmActivitys = [
    'All',
    'Freight Forwarders',
    'Booking',
    'Supplier',
    'Owner',
    'Driver',
  ];

  vehicleTypes = [
    'All',
    'LCV',
    'Trailer',
    'Truck (Taurus)',
    'Open Trucks',
    'Part Load',
    'ODC',
    '20ft Container CBT',
    '20ft / 40ft Container (Import and Export)',
    '32ft Container',
  ];

  locationsArr = [
    'All',
    'Agartala',
    'Agra',
    'Ahmedabad',
    'Ahmednagar',
    'Ajmer',
    'Akola',
    'Aligarh',
    'Alwar',
    'Ambala',
    'Amravati',
    'Amritsar',
    'Anand',
    'Angol',
    'Anjar',
    'Ankleshwar',
    'Asansol',
    'Aurangabad',
    'Baddi',
    'Bangalore',
    'Baramati',
    'Beawar',
    'Belgaon',
    'Bellary',
    'Betul',
    'Bhavnagar',
    'Bhilai',
    'Bhilwada',
    'Bhiwadi',
    'Bhiwani',
    'Bhopal',
    'Bhubaneshwar',
    'Bhuj',
    'Bikaner',
    'Bilaspur',
    'Bokaro',
    'Calicut',
    'Chanderpur',
    'Chandigarh',
    'Chennai',
    'Chhatral',
    'Cochin',
    'Coimbaotre',
    'Cuttack',
    'Darbhanga',
    'Deharadun',
    'Delhi',
    'Dewas',
    'Dhanbad',
    'Dhule',
    'Durgapur',
    'Erode',
    'Faridabad',
    'Gandhidham',
    'Ganjbasoda',
    'Ghaziyabad',
    'Goa',
    'Gorakhpur',
    'Guntur',
    'Gurgaon',
    'Guwahati',
    'Gwalior',
    'Haldwani',
    'Haridwar',
    'Himmatnagar',
    'Hisar',
    'Hospet',
    'Hosur',
    'Hubli',
    'Hyderabad',
    'Ichalkaranji',
    'Indore',
    'Jabalpur',
    'Jaipur',
    'Jalandhar',
    'Jalgaon',
    'Jalna',
    'Jammu',
    'Jamnagar',
    'Jamshedpur',
    'Kala Amb',
    'Jhansi',
    'Jodhpur',
    'Kanpur',
    'Karimnagar',
    'Karnal',
    'Kashipur',
    'Katni',
    'Kharagpur',
    'Kolhapur',
    'KOLKATA',
    'Korba',
    'Kota',
    'Lucknow',
    'Ludhiana',
    'Madurai',
    'Mahsana',
    'Mandi Gobindgarh',
    'Meerut',
    'Morbi',
    'Multai',
    'Mumbai',
    'Muradabad',
    'Muzaffarnagar',
    'Muzaffarpur',
    'Mysore',
    'Nagpur',
    'Namakkal',
    'Nashik',
    'Nasirabad',
    'Neemuch',
    'Noida',
    'Panipat',
    'Patna',
    'Pithampur',
    'Pondicherry',
    'Prayagraj',
    'Pune',
    'Raichur',
    'Raigarh',
    'Raipur',
    'Rajkot',
    'Rajpura',
    'Ramgarh',
    'Ranchi',
    'Ratlam',
    'Rohtak',
    'Rourkela',
    'Rudrapur',
    'Sagar',
    'Saharanpur',
    'Sangli',
    'Satara',
    'Selam',
    'Shillong',
    'Siliguri',
    'Silvasa',
    'Solapur',
    'Srinagar',
    'Surat',
    'Thiruvananthapuram',
    'Thrissur',
    'Tinsukia',
    'Tirupati',
    'Udaipur',
    'Ujjain',
    'Umbergaon',
    'Unjha',
    'Vadodara',
    'Vapi',
    'Varanasi',
    'Vidisha',
    'Vijayawada',
    'Vishakhapatnam',
    'Warangal',
    'Daman',
    'Halol',
    'Nizambad',
    'Pan India',
  ];

  accountStatusArr = ['All', 'Active', 'Inactive'];
  paymentStatusArr = ['All', 'Paid', 'Not Paid'];

  constructor(
    public service: DailySaleService,
    private fbstore: AngularFirestore,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public formBuilder: FormBuilder
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    /**
     * BreadCrumb Set
     */
    this.breadCrumbItems = [
      { label: 'DailySale' },
      { label: 'DataTables', active: true },
    ];

    this.locations = this.locationsArr.sort((a, b) =>
      a > b ? 1 : b > a ? -1 : 0
    );

    /**
     * Bootstrap validation form data
     */
    this.dailySaleForm = this.formBuilder.group({
      firmActivity: ['', [Validators.required]],
      date: ['', [Validators.required]],
      location: ['', [Validators.required]],
      paymentStatus: ['', [Validators.required]],
    });
  }

  /**
   * On submit search form
   */
  onSubmitSearch(value: any) {
    this.submitted = true;
    console.log(value);
    console.log('search');
    // stop here if form is invalid
    if (this.dailySaleForm.invalid) {
      return;
    } else {
      this._fetchData(value);
    }
  }

  /**
   * fetches the table value
   */
  _fetchData(value: any) {
    this.getFirebaseData(value);
  }

  /**
   * fetches the table from firebase
   */
  getFirebaseData(_value: any) {
    try {
      this.spinner.show();

      if (
        _value.location === 'All' &&
        _value.firmActivity === 'All' &&
        _value.paymentStatus === 'All'
      ) {
        console.log('All');
        this.companysCollection = this.fbstore.collection('companys', (ref) =>
          ref.where('payment_date', '==', _value.date)
        );
      } else if (
        _value.location === 'All' &&
        _value.firmActivity === 'All' &&
        _value.paymentStatus !== 'All'
      ) {
        console.log('location and firm');
        this.companysCollection = this.fbstore.collection('companys', (ref) =>
          ref
            .where('payment_date', '==', _value.date)
            .where('paymentStatus', '==', _value.paymentStatus)
        );
      } else if (
        _value.location === 'All' &&
        _value.firmActivity !== 'All' &&
        _value.paymentStatus !== 'All'
      ) {
        console.log('location');
        this.companysCollection = this.fbstore.collection('companys', (ref) =>
          ref
            .where('payment_date', '==', _value.date)
            .where('firmActivity', '==', _value.firmActivity)
            .where('paymentStatus', '==', _value.paymentStatus)
        );
      } else if (
        _value.location === 'All' &&
        _value.firmActivity !== 'All' &&
        _value.paymentStatus === 'All'
      ) {
        console.log('location and payment');
        this.companysCollection = this.fbstore.collection('companys', (ref) =>
          ref
            .where('payment_date', '==', _value.date)
            .where('firmActivity', '==', _value.firmActivity)
        );
      } else if (
        _value.location !== 'All' &&
        _value.firmActivity === 'All' &&
        _value.paymentStatus === 'All'
      ) {
        console.log('payment and firm');
        this.companysCollection = this.fbstore.collection('companys', (ref) =>
          ref
            .where('payment_date', '==', _value.date)
            .where('location', '==', _value.location)
        );
      } else if (
        _value.location !== 'All' &&
        _value.firmActivity === 'All' &&
        _value.paymentStatus !== 'All'
      ) {
        console.log('payment and location');
        this.companysCollection = this.fbstore.collection('companys', (ref) =>
          ref
            .where('payment_date', '==', _value.date)
            .where('location', '==', _value.location)
            .where('paymentStatus', '==', _value.paymentStatus)
        );
      } else if (
        _value.location !== 'All' &&
        _value.firmActivity !== 'All' &&
        _value.paymentStatus === 'All'
      ) {
        console.log('payment and location');
        this.companysCollection = this.fbstore.collection('companys', (ref) =>
          ref
            .where('payment_date', '==', _value.date)
            .where('location', '==', _value.location)
            .where('firmActivity', '==', _value.firmActivity)
        );
      } else {
        this.companysCollection = this.fbstore.collection('companys', (ref) =>
          ref
            .where('payment_date', '==', _value.date)
            .where('location', '==', _value.location)
            .where('firmActivity', '==', _value.firmActivity)
            .where('paymentStatus', '==', _value.paymentStatus)
        );
      }

      this.getCompanys = this.companysCollection.snapshotChanges().pipe(
        map((actions) => {
          return actions.map((action) => {
            const data = action.payload.doc.data();
            return {
              id: action.payload.doc.id,
              aadharNumber: data.aadharNumber,
              accountStatus: data.accountStatus,
              alternateMobileNumber: data.alternateMobileNumber,
              companyName: data.companyName,
              drivingLicenseNumber: data.drivingLicenseNumber,
              firmActivity: data.firmActivity,
              language: data.language,
              location: data.location,
              mobileNumber: data.mobileNumber,
              ownerName: data.ownerName,
              passwordPin: data.passwordPin,
              paymentStatus: data.paymentStatus,
              referenceName: data.referenceName,
              serviceProvidedLocation: data.serviceProvidedLocation,
              userEntry: data.userEntry,
              vehicleType: data.vehicleType,
              vehicleNos: data.vehicleNos,
              payment_date: data.payment_date,
              registeredDate: data.registeredDate,
              updatedDate: data.updatedDate,
            };
          });
        })
      );

      this.getCompanys.subscribe((snapshot) => {
        this.spinner.hide();
        if (snapshot.length === 0) {
          this.showTable = false;
          this.norecordFound = true;
          this.tableData = [];
        } else {
          this.norecordFound = false;
          this.showTable = true;
          this.service.tableDataSnapshot = snapshot;
          this.tableData = snapshot;
          this.totalData = snapshot.length;
        }
      });
    } catch (error) {
      this.spinner.hide();
      this.toastr.error('Something went wrong. Please check after some time!');
    }
  }

  /**
   * Sort table data
   * @param param sort the column
   *
   */
  onSort({ column, direction }: any) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
  /**
   * Export table data
   * @param param sort the column
   *
   */
  export() {
    this.exportActive = true;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'Daily-Sale-Report.xlsx');
  }
}
