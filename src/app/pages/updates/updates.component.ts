import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Company } from 'src/app/core/models/companys';
import { AlertColor } from '../components/alerts/alerts.model';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss'],
})

/**
 * Updates Component
 */
export class UpdatesComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  alertData: AlertColor[] = [];

  // Form submition
  submit!: boolean;
  formsubmit!: boolean;
  submitted = false;
  valueUpdated = false;

  // Updates form
  updatesForm!: FormGroup;

  // Search form
  searchForm!: FormGroup;

  disabledFlag = true;
  checkFirmActivityIsDriver = false;
  checkFirmActivityIsOwner = false;
  showUpdateForm = false;
  updatedValue = true;

  CountryCode: any = '+91';
  filteredUser!: Observable<any>;
  companysCollection!: AngularFirestoreCollection<Company>;
  serviceProvidedLocations: string[] = [];
  locations: string[] = [];
  docid!: string;

  firmActivitys = [
    'Freight Forwarders',
    'Booking',
    'Supplier',
    'Owner',
    'Driver',
  ];

  vehicleTypes = [
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

  languages = [
    {
      id: 'en',
      name: 'ENGLISH',
      description: 'ENGLISH',
      img: 'english',
    },
    {
      id: 'hi',
      name: 'हिंदी',
      description: 'HINDI',
      img: 'hindi',
    },
    {
      id: 'ma',
      name: 'मराठी',
      description: 'MARATHI',
      img: 'marathi',
    },
    {
      id: 'gu',
      name: 'ગુજરાતી',
      description: 'GUJARATI',
      img: 'gujarati',
    },
    {
      id: 'tn',
      name: 'தமிழ்',
      description: 'TAMIL',
      img: 'tamil',
    },
    {
      id: 'tl',
      name: 'తెలుగు',
      description: 'TELUGU',
      img: 'telugu',
    },
    {
      id: 'ka',
      name: 'ಕೆನಡಾ',
      description: 'KANADA',
      img: 'kanada',
    },
    {
      id: 'ml',
      name: 'മലയാളം',
      description: 'MALAYALAM',
      img: 'malayalam',
    },
    {
      id: 'pn',
      name: 'മലയാളം',
      description: 'PUNJABI',
      img: 'telugu',
    },
  ];

  locationsArr = [
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

  accountStatusArr = ['Active', 'Inactive'];
  paymentStatusArr = ['Paid', 'Not Paid'];

  alertDataArr = [
    {
      color: 'success',
      icon: 'mdi-check-all',
    },
  ];

  constructor(
    public formBuilder: FormBuilder,
    private fbstore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    /**
     * BreadCrumb Set
     */
    this.breadCrumbItems = [
      { label: 'Forms' },
      { label: 'Form Updates', active: true },
    ];

    /**
     * Bootstrap validation form data
     */
    this.searchForm = this.formBuilder.group({
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
      ],
    });
    this.initializeModifyForm();
    this.submit = false;
    this.formsubmit = false;

    this.locations = this.locationsArr.sort((a, b) =>
      a > b ? 1 : b > a ? -1 : 0
    );
    this.serviceProvidedLocations = this.locationsArr.sort((a, b) =>
      a > b ? 1 : b > a ? -1 : 0
    );

    this.vehicleTypes = this.vehicleTypes.sort((a, b) =>
      a > b ? 1 : b > a ? -1 : 0
    );
  }
  /**
   * Bootstrap validation form data
   */
  initializeModifyForm(): void {
    this.updatesForm = this.formBuilder.group({
      companyName: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
      ],
      ownerName: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
      ],
      firmActivity: ['', [Validators.required]],
      vehicleType: ['', [Validators.required]],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('[0-9]{1,10}$')],
      ],
      alternateMobileNumber: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
      ],
      location: ['', [Validators.required]],
      serviceProvidedLocation: ['', [Validators.required]],
      referenceName: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
      ],
      language: ['', [Validators.required]],
      vehicleNos: [
        '',
        [Validators.required, Validators.pattern('[0-9]{1,12}$')],
      ],
      aadharNumber: [
        '',
        [Validators.required, Validators.pattern('[0-9]{1,12}$')],
      ],

      drivingLicenseNumber: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')],
      ],
      paymentStatus: ['', [Validators.required]],
      accountStatus: ['', [Validators.required]],
      passwordPin: ['', [Validators.required]],
    });
  }
  /**
   * Bootstrap validation form data
   */
  getCompanysData(formvalue: { mobileNumber: any }) {
    const mobileNumber = this.CountryCode + formvalue.mobileNumber;
    if (formvalue.mobileNumber.length === 10) {
      this.companysCollection = this.fbstore.collection('companys', (ref) =>
        ref.where('mobileNumber', '==', mobileNumber)
      );

      this.filteredUser = this.companysCollection.snapshotChanges().pipe(
        map((actions) => {
          return actions.map((action) => {
            const data = action.payload.doc.data() as Company;
            return {
              id: action.payload.doc.id,
              companyName: data['companyName'],
              ownerName: data['ownerName'],
              firmActivity: data['firmActivity'],
              vehicleType: data['vehicleType'],
              mobileNumber: data['mobileNumber'],
              alternateMobileNumber: data['alternateMobileNumber'],
              location: data['location'],
              serviceProvidedLocation: data['serviceProvidedLocation'],
              referenceName: data['referenceName'],
              vehicleNos: data['vehicleNos'],
              aadharNumber: data['aadharNumber'],
              drivingLicenseNumber: data['drivingLicenseNumber'],
              paymentStatus: data['paymentStatus'],
              accountStatus: data['accountStatus'],
              language: data['language'],
              passwordPin: data['passwordPin'],
            };
          });
        })
      );

      this.filteredUser.subscribe((snapshot) => {
        if (snapshot.length > 0 && !this.updatedValue) {
          console.log(snapshot[0]);
          console.log('User found in db' + snapshot[0].id);
          console.log('repeat');
          this.onFirmActivityValue(snapshot[0]);
          this.docid = snapshot[0].id;
          this.showUpdateForm = true;
          this.updatesForm.controls['companyName'].setValue(
            snapshot[0]['companyName']
          );
          this.updatesForm.controls['ownerName'].setValue(
            snapshot[0]['ownerName']
          );
          this.updatesForm.controls['firmActivity'].setValue(
            snapshot[0]['firmActivity']
          );
          this.updatesForm.controls['vehicleType'].setValue(
            snapshot[0]['vehicleType']
          );
          this.updatesForm.controls['mobileNumber'].setValue(
            snapshot[0]['mobileNumber']
          );
          this.updatesForm.controls['alternateMobileNumber'].setValue(
            snapshot[0]['alternateMobileNumber']
          );
          this.updatesForm.controls['location'].setValue(
            snapshot[0]['location']
          );
          this.updatesForm.controls['serviceProvidedLocation'].setValue(
            snapshot[0]['serviceProvidedLocation']
          );
          this.updatesForm.controls['referenceName'].setValue(
            snapshot[0]['referenceName']
          );
          this.updatesForm.controls['language'].setValue(
            snapshot[0]['language']
          );
          this.updatesForm.controls['vehicleNos'].setValue(
            snapshot[0]['vehicleNos']
          );
          this.updatesForm.controls['aadharNumber'].setValue(
            snapshot[0]['aadharNumber']
          );
          this.updatesForm.controls['drivingLicenseNumber'].setValue(
            snapshot[0]['drivingLicenseNumber']
          );
          this.updatesForm.controls['paymentStatus'].setValue(
            snapshot[0]['paymentStatus']
          );
          this.updatesForm.controls['accountStatus'].setValue(
            snapshot[0]['accountStatus']
          );
          this.updatesForm.controls['passwordPin'].setValue(
            snapshot[0]['passwordPin']
          );
        } else {
          if (!this.updatedValue) {
            this.showUpdateForm = false;
            console.log('User NOT found');
            this.toastr.error('User not registered in db!', 'NOT FOUND!');
          }
        }
      });
    }
  }
  /**
   * Bootstrap validation form data
   */
  onFirmActivityValue(result: { [x: string]: string }) {
    if (result['firmActivity'] === 'Driver') {
      this.checkFirmActivityIsOwner = false;
      this.checkFirmActivityIsDriver = true;
    } else if (result['firmActivity'] === 'Owner') {
      this.checkFirmActivityIsDriver = false;
      this.checkFirmActivityIsOwner = true;
    } else {
      this.checkFirmActivityIsDriver = false;
      this.checkFirmActivityIsOwner = false;
    }
  }
  /**
   * Bootstrap validation form data
   */
  onFirmActivityChange(value: { detail: { value: string } }) {
    if (value.detail.value === 'Driver') {
      this.checkFirmActivityIsOwner = false;
      this.checkFirmActivityIsDriver = true;
    } else if (value.detail.value === 'Owner') {
      this.checkFirmActivityIsDriver = false;
      this.checkFirmActivityIsOwner = true;
    } else {
      this.checkFirmActivityIsDriver = false;
      this.checkFirmActivityIsOwner = false;
    }
  }

  /**
   * Returns form
   */
  get form() {
    return this.updatesForm.controls;
  }

  /**
   * Bootstrap tooltip form validation submit method
   */
  formSubmit() {
    this.formsubmit = true;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.updatesForm.controls;
  }

  /**
   * On submit search form
   */
  onSubmitSearch(value: { mobileNumber: any }) {
    this.submitted = true;
    console.log(value);
    console.log('search');
    this.updatedValue = false;
    this.getCompanysData(value);
    // stop here if form is invalid
    if (this.searchForm.invalid) {
      return;
    }
  }

  /**
   * On submit updates form
   */
  onSubmitUpdate() {
    this.submitted = true;
    console.log('update');
    this.doModify();
  }
  /**
   * On submit updates form
   */
  doModify() {
    const companyobj: Company = {
      companyName: this.updatesForm.get('companyName')!.value,
      ownerName: this.updatesForm.get('ownerName')!.value,
      firmActivity: this.updatesForm.get('firmActivity')!.value,
      vehicleType: this.updatesForm.get('vehicleType')!.value,
      mobileNumber: this.updatesForm.get('mobileNumber')!.value,
      alternateMobileNumber: this.updatesForm.get('alternateMobileNumber')!
        .value,
      location: this.updatesForm.get('location')!.value,
      serviceProvidedLocation: this.updatesForm.get('serviceProvidedLocation')!
        .value,
      referenceName: this.updatesForm.get('referenceName')!.value,
      language: this.updatesForm.get('language')!.value,
      vehicleNos: this.updatesForm.get('vehicleNos')!.value,
      aadharNumber: this.updatesForm.get('aadharNumber')!.value,
      drivingLicenseNumber: this.updatesForm.get('drivingLicenseNumber')!.value,
      paymentStatus: this.updatesForm.get('paymentStatus')!.value,
      accountStatus: this.updatesForm.get('accountStatus')!.value,
      passwordPin: this.updatesForm.get('passwordPin')!.value,
    };
    let doc = this.fbstore.collection('companys', (ref) =>
      ref.where(
        'mobileNumber',
        '==',
        this.updatesForm.get('mobileNumber')!.value
      )
    );
    doc
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id };
          })
        )
      )
      .subscribe((_doc: any) => {
        let id = _doc[0].id; //first result of query [0]
        this.fbstore
          .doc(`companys/${this.docid}`)
          .update(companyobj)
          .then((data) => {
            console.log(data);
            // eslint-disable-next-line no-redeclare
            this.toastr.success('Updated successfully in db!', 'Great Job!');
            this.showUpdateForm = false;
            this.submitted = false;
            this.updatedValue = true;
            this.updatesForm.reset();
            this.searchForm.reset();
          });
      });
  }
  /* Delete Data remove
   */
  deleteData() {
    console.log('delete');
    try {
      console.log(this.docid);
      this.fbstore
        .doc('companys/' + this.docid)
        .delete()
        .then((data) => {
          console.log('Data deleted Successfully');
          this.toastr.success('Deleted successfully in db!', 'Great Job!');
          this.showUpdateForm = false;
          this.updatesForm.reset();
          this.searchForm.reset();
        });
    } catch (error) {
      console.error('Error removing document: ', error);
      // this.toastr.success('Delete is not done in db!', 'Something went wrong!');
    }
  }
}
