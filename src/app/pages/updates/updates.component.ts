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
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Company } from 'src/app/core/models/companys';
import { AlertColor } from '../components/alerts/alerts.model';
import { UpdatesService } from './updates.service';

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
  userPaidFlag = false;
  checkFirmActivityIsDriver = false;
  checkFirmActivityIsOwner = false;
  showUpdateForm = false;
  updatedValue = true;
  disabled = true;

  CountryCode: any = '+91';
  filteredUser!: Observable<any>;
  companysCollection!: AngularFirestoreCollection<Company>;
  modifyCompanysCollection!: AngularFirestoreCollection<Company>;
  serviceProvidedLocations: string[] = [];
  panIndiaLocations: string[] = ['Pan India'];
  locations: string[] = [];
  docid!: string;
  selectedFirmActivity!: string;
  filterModifyUser!: Observable<any>;
  subscription!: Subscription;

  selectedDefaultPaymentDate = new Date().toISOString().slice(0, 10);

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

  constructor(
    public formBuilder: FormBuilder,
    private fbstore: AngularFirestore,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private updatesService: UpdatesService
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
    this.setFirmActivityValidators();
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
      companyName: ['', [Validators.required]],
      ownerName: ['', [Validators.required]],
      firmActivity: ['', [Validators.required]],
      vehicleType: ['', [Validators.required]],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('[0-9]{1,10}$')],
      ],
      alternateMobileNumber: ['', [Validators.pattern('[0-9]{1,10}$')]],
      location: ['', [Validators.required]],
      serviceProvidedLocation: ['', [Validators.required]],
      referenceName: ['', [Validators.pattern("^[a-zA-Z -']+")]],
      language: ['', [Validators.required]],
      vehicleNos: [
        '',
        [Validators.required, Validators.pattern('[0-9]{1,12}$')],
      ],
      aadharNumber: ['', [Validators.pattern('[0-9]{1,12}$')]],

      drivingLicenseNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]+$'),
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      paymentStatus: ['', [Validators.required]],
      accountStatus: ['', [Validators.required]],
      passwordPin: ['', [Validators.required]],
      payment_date: ['', [Validators.required]],
    });
  }
  /**
   * setFirmActivityValidators validation form data
   */
  setFirmActivityValidators() {
    const companyNameControl = this.updatesForm.get('companyName')!;
    const vehicleNosControl = this.updatesForm.get('vehicleNos')!;

    const drivingLicenseNumberControl = this.updatesForm.get(
      'drivingLicenseNumber'
    )!;

    this.updatesForm
      .get('firmActivity')!
      .valueChanges.subscribe((selectedFirmActivity) => {
        if (selectedFirmActivity === 'Owner') {
          companyNameControl.setValidators([Validators.required]);
          vehicleNosControl.setValidators([Validators.required]);
          drivingLicenseNumberControl.setValidators([
            Validators.pattern('[a-zA-Z0-9 ]*$'),
          ]);
        } else if (selectedFirmActivity === 'Driver') {
          companyNameControl.setValidators(null);
          vehicleNosControl.setValidators(null);
          drivingLicenseNumberControl.setValidators([
            Validators.required,
            Validators.pattern('[a-zA-Z0-9 ]*$'),
          ]);
        } else {
          companyNameControl.setValidators([Validators.required]);
          vehicleNosControl.setValidators(null);
          drivingLicenseNumberControl.setValidators([
            Validators.pattern('[a-zA-Z0-9 ]*$'),
          ]);
        }

        companyNameControl.updateValueAndValidity();
        vehicleNosControl.updateValueAndValidity();
        drivingLicenseNumberControl.updateValueAndValidity();
      });
  }
  /**
   * Bootstrap validation form data
   */
  getCompanysData(formvalue: { mobileNumber: any }) {
    const mobileNumber = this.CountryCode + formvalue.mobileNumber;
    if (formvalue.mobileNumber.length === 10) {
      this.spinner.show();
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
              payment_date: data['payment_date'],
            };
          });
        })
      );

      this.filteredUser.subscribe((snapshot) => {
        if (snapshot.length > 0 && !this.updatedValue) {
          this.spinner.hide();
          console.log(snapshot[0]);
          console.log('User found in db' + snapshot[0].id);
          console.log('repeat');
          this.onFirmActivityValue(snapshot[0]);
          this.docid = snapshot[0].id;
          this.showUpdateForm = true;

          this.userPaidFlag =
            snapshot[0]['paymentStatus'] === 'Paid' ? true : false;

          let modifyMobileNumber;
          let modifyAlternateNumber;
          const mobileNumber = snapshot[0]['mobileNumber'].indexOf('+91');
          if (mobileNumber !== -1) {
            modifyMobileNumber = snapshot[0]['mobileNumber'].replace('+91', '');
          } else {
            modifyMobileNumber = snapshot[0]['mobileNumber'];
          }

          const alternateNumber =
            snapshot[0]['alternateMobileNumber'].indexOf('+91');
          if (alternateNumber !== -1) {
            modifyAlternateNumber = snapshot[0][
              'alternateMobileNumber'
            ].replace('+91', '');
          } else {
            modifyAlternateNumber = snapshot[0]['alternateMobileNumber'];
          }

          const paymentDate = new Date(snapshot[0]['payment_date']);

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
            modifyMobileNumber
          );
          this.updatesForm.controls['alternateMobileNumber'].setValue(
            modifyAlternateNumber
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
          this.updatesForm.controls['payment_date'].setValue(
            paymentDate.toISOString().slice(0, 10)
          );
        } else {
          this.spinner.hide();
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
  onFirmActivityChange(event: any) {
    console.log(event);
    this.selectedFirmActivity = event;
    if (event === 'Driver') {
      this.checkFirmActivityIsOwner = false;
      this.checkFirmActivityIsDriver = true;
    } else if (event === 'Owner') {
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
    // stop here if form is invalid
    if (this.searchForm.invalid) {
      return;
    } else {
      this.getCompanysData(value);
    }
  }

  /**
   * On submit updates form
   */
  onSubmitUpdate() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updatesForm.invalid) {
      return;
    } else {
      // this.doModify();
      this.onSubmitUpdateData();
    }
  }
  /**
   * On submit updates form
   */
  async doModify() {
    const mobileNo = '+91' + this.updatesForm.get('mobileNumber')!.value;

    if (this.updatesForm.valid) {
      const companyObj = {
        companyName: this.updatesForm.get('companyName')!.value,
        ownerName: this.updatesForm.get('ownerName')!.value,
        firmActivity: this.updatesForm.get('firmActivity')!.value,
        vehicleType: this.updatesForm.get('vehicleType')!.value,
        mobileNumber: '+91' + this.updatesForm.get('mobileNumber')!.value,
        alternateMobileNumber:
          '+91' + this.updatesForm.get('alternateMobileNumber')!.value,
        location: this.updatesForm.get('location')!.value,
        serviceProvidedLocation: this.updatesForm.get(
          'serviceProvidedLocation'
        )!.value,
        referenceName: this.updatesForm.get('referenceName')!.value,
        language: this.updatesForm.get('language')!.value,
        vehicleNos: this.updatesForm.get('vehicleNos')!.value,
        aadharNumber: this.updatesForm.get('aadharNumber')!.value,
        drivingLicenseNumber: this.updatesForm.get('drivingLicenseNumber')!
          .value,
        paymentStatus: this.updatesForm.get('paymentStatus')!.value,
        accountStatus: this.updatesForm.get('accountStatus')!.value,
        passwordPin: this.updatesForm.get('passwordPin')!.value,
      };

      try {
        await this.fbstore
          .doc('companys/' + this.docid)
          .update(companyObj)
          .then(() => {
            this.toastr.success('Updated successfully in db!', 'Great Job!');
            this.showUpdateForm = false;
            this.submitted = false;
            this.updatedValue = true;
            this.updatesForm.reset();
            this.searchForm.reset();
          });
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    }
  }
  /* Delete Data remove
   */
  async deleteData() {
    console.log('delete');
    try {
      console.log(this.docid);
      await this.fbstore
        .doc('companys/' + this.docid)
        .delete()
        .then(() => {
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

  onSubmitUpdateData() {
    const mobileNumber =
      this.CountryCode + this.updatesForm.get('mobileNumber')!.value;
    if (this.updatesForm.valid) {
      const companyObj = {
        companyName: this.updatesForm.get('companyName')!.value,
        ownerName: this.updatesForm.get('ownerName')!.value,
        firmActivity: this.updatesForm.get('firmActivity')!.value,
        vehicleType: this.updatesForm.get('vehicleType')!.value,
        mobileNumber: '+91' + this.updatesForm.get('mobileNumber')!.value,
        alternateMobileNumber:
          '+91' + this.updatesForm.get('alternateMobileNumber')!.value,
        location: this.updatesForm.get('location')!.value,
        serviceProvidedLocation: this.updatesForm.get(
          'serviceProvidedLocation'
        )!.value,
        referenceName: this.updatesForm.get('referenceName')!.value,
        language: this.updatesForm.get('language')!.value,
        vehicleNos: this.updatesForm.get('vehicleNos')!.value,
        aadharNumber: this.updatesForm.get('aadharNumber')!.value,
        drivingLicenseNumber: this.updatesForm.get('drivingLicenseNumber')!
          .value,
        paymentStatus: this.updatesForm.get('paymentStatus')!.value,
        accountStatus: this.updatesForm.get('accountStatus')!.value,
        passwordPin: this.updatesForm.get('passwordPin')!.value,
      };
      const COMPANY_ITEMS = this.fbstore.collection('companys');

      COMPANY_ITEMS.ref
        .where('mobileNumber', '==', mobileNumber)
        .get()
        .then((snapshots) => {
          if (snapshots.size > 0) {
            snapshots.forEach((doc) => {
              COMPANY_ITEMS.doc(doc.id).update({
                companyName: this.updatesForm.get('companyName')!.value,
                ownerName: this.updatesForm.get('ownerName')!.value,
                firmActivity: this.updatesForm.get('firmActivity')!.value,
                vehicleType: this.updatesForm.get('vehicleType')!.value,
                mobileNumber:
                  '+91' + this.updatesForm.get('mobileNumber')!.value,
                alternateMobileNumber:
                  '+91' + this.updatesForm.get('alternateMobileNumber')!.value,
                location: this.updatesForm.get('location')!.value,
                serviceProvidedLocation: this.updatesForm.get(
                  'serviceProvidedLocation'
                )!.value,
                referenceName: this.updatesForm.get('referenceName')!.value,
                language: this.updatesForm.get('language')!.value,
                vehicleNos: this.updatesForm.get('vehicleNos')!.value,
                aadharNumber: this.updatesForm.get('aadharNumber')!.value,
                drivingLicenseNumber: this.updatesForm.get(
                  'drivingLicenseNumber'
                )!.value,
                paymentStatus: this.updatesForm.get('paymentStatus')!.value,
                accountStatus: this.updatesForm.get('accountStatus')!.value,
                passwordPin: this.updatesForm.get('passwordPin')!.value,
                payment_date: this.updatesForm.get('payment_date')!.value,
                updatedDate: new Date().toISOString().slice(0, 10),
              });
            });
            this.toastr.success('Updated successfully in db!', 'Great Job!');
            this.showUpdateForm = false;
            this.submitted = false;
            this.updatedValue = true;
            this.updatesForm.reset();
            this.searchForm.reset();
          }
        });
    }
  }
}
