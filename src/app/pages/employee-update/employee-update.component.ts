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
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Company } from 'src/app/core/models/companys';
import { Employee } from 'src/app/core/models/employees';
import { AlertColor } from '../components/alerts/alerts.model';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss'],
})

/**
 * employeeUpdate Component
 */
export class EmployeeUpdateComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  alertData: AlertColor[] = [];

  // Form submition
  submit!: boolean;
  formsubmit!: boolean;
  submitted = false;
  valueUpdated = false;

  // employeeUpdate form
  employeeUpdateForm!: FormGroup;

  // Search form
  searchForm!: FormGroup;

  disabledFlag = true;
  checkFirmActivityIsDriver = false;
  checkFirmActivityIsOwner = false;
  showUpdateForm = false;
  updatedValue = true;

  CountryCode: any = '+91';
  filteredUser!: Observable<any>;
  employeeCollection!: AngularFirestoreCollection<Employee>;
  modifyEmployeeCollection!: AngularFirestoreCollection<Employee>;

  docid!: string;
  filterModifyUser!: Observable<any>;

  statusArr = ['Active', 'Inactive'];
  genderArr = ['Male', 'Female'];

  constructor(
    public formBuilder: FormBuilder,
    private fbstore: AngularFirestore,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    /**
     * BreadCrumb Set
     */
    this.breadCrumbItems = [
      { label: 'Forms' },
      { label: 'Form employeeUpdate', active: true },
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
  }
  /**
   * Bootstrap validation form data
   */
  initializeModifyForm(): void {
    this.employeeUpdateForm = this.formBuilder.group({
      firstName: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
      ],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      state: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      zip: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      mobileNumber: ['', [Validators.required]],
      email: [''],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      emergencyContactNumber: ['', [Validators.required]],
      relationshipWithEmp: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
      ],
      bankName: [''],
      accountNumber: [''],
      ifscCode: [''],
      status: [''],
      joiningDate: [''],
      lastDate: [''],
      role: [''],
      responsibility: [''],
      leaveTotal: [''],
      remainingLeaves: [''],
    });
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
      this.getEmployeeData(value);
    }
  }
  /**
   * Bootstrap validation form data
   */
  getEmployeeData(formvalue: { mobileNumber: any }) {
    const mobileNumber = this.CountryCode + formvalue.mobileNumber;
    if (formvalue.mobileNumber.length === 10) {
      this.spinner.show();
      this.employeeCollection = this.fbstore.collection('employees', (ref) =>
        ref.where('mobileNumber', '==', mobileNumber)
      );

      this.filteredUser = this.employeeCollection.snapshotChanges().pipe(
        map((actions) => {
          return actions.map((action) => {
            const data = action.payload.doc.data() as Employee;
            return {
              id: action.payload.doc.id,
              firstName: data['firstName'],
              lastName: data['lastName'],
              address: data['address'],
              city: data['city'],
              state: data['state'],
              zip: data['zip'],
              mobileNumber: data['mobileNumber'],
              email: data['email'],
              dateOfBirth: data['dateOfBirth'],
              gender: data['gender'],
              emergencyContactNumber: data['emergencyContactNumber'],
              relationshipWithEmp: data['relationshipWithEmp'],
              bankName: data['bankName'],
              accountNumber: data['accountNumber'],
              ifscCode: data['ifscCode'],
              status: data['status'],
              joiningDate: data['joiningDate'],
              lastDate: data['lastDate'],
              role: data['role'],
              responsibility: data['responsibility'],
              leaveTotal: data['leaveTotal'],
              remainingLeaves: data['remainingLeaves'],
            };
          });
        })
      );

      this.filteredUser.subscribe((snapshot) => {
        if (snapshot.length > 0 && !this.updatedValue) {
          this.spinner.hide();
          console.log(snapshot[0]);
          console.log('Employee found in db' + snapshot[0].id);
          console.log('repeat');
          this.docid = snapshot[0].id;
          this.showUpdateForm = true;

          let modifyMobileNumber;
          const mobileNumber = snapshot[0]['mobileNumber'].indexOf('+91');
          if (mobileNumber !== -1) {
            modifyMobileNumber = snapshot[0]['mobileNumber'].replace('+91', '');
          } else {
            modifyMobileNumber = snapshot[0]['mobileNumber'];
          }

          this.employeeUpdateForm.controls['firstName'].setValue(
            snapshot[0]['firstName']
          );
          this.employeeUpdateForm.controls['lastName'].setValue(
            snapshot[0]['lastName']
          );
          this.employeeUpdateForm.controls['address'].setValue(
            snapshot[0]['address']
          );
          this.employeeUpdateForm.controls['state'].setValue(
            snapshot[0]['state']
          );
          this.employeeUpdateForm.controls['city'].setValue(
            snapshot[0]['city']
          );
          this.employeeUpdateForm.controls['zip'].setValue(snapshot[0]['zip']);
          this.employeeUpdateForm.controls['mobileNumber'].setValue(
            modifyMobileNumber
          );
          this.employeeUpdateForm.controls['email'].setValue(
            snapshot[0]['email']
          );
          this.employeeUpdateForm.controls['dateOfBirth'].setValue(
            snapshot[0]['dateOfBirth']
          );
          this.employeeUpdateForm.controls['gender'].setValue(
            snapshot[0]['gender']
          );
          this.employeeUpdateForm.controls['emergencyContactNumber'].setValue(
            snapshot[0]['emergencyContactNumber']
          );
          this.employeeUpdateForm.controls['relationshipWithEmp'].setValue(
            snapshot[0]['relationshipWithEmp']
          );
          this.employeeUpdateForm.controls['bankName'].setValue(
            snapshot[0]['bankName']
          );
          this.employeeUpdateForm.controls['accountNumber'].setValue(
            snapshot[0]['accountNumber']
          );
          this.employeeUpdateForm.controls['ifscCode'].setValue(
            snapshot[0]['ifscCode']
          );
          this.employeeUpdateForm.controls['status'].setValue(
            snapshot[0]['status']
          );
          this.employeeUpdateForm.controls['joiningDate'].setValue(
            snapshot[0]['joiningDate']
          );
          this.employeeUpdateForm.controls['lastDate'].setValue(
            snapshot[0]['lastDate']
          );
          this.employeeUpdateForm.controls['role'].setValue(
            snapshot[0]['role']
          );
          this.employeeUpdateForm.controls['responsibility'].setValue(
            snapshot[0]['responsibility']
          );
          this.employeeUpdateForm.controls['leaveTotal'].setValue(
            snapshot[0]['leaveTotal']
          );
          this.employeeUpdateForm.controls['remainingLeaves'].setValue(
            snapshot[0]['remainingLeaves']
          );
        } else {
          this.spinner.hide();
          if (!this.updatedValue) {
            this.showUpdateForm = false;
            console.log('Employee NOT found');
            // this.toastr.error('Employee not saved in db!', 'NOT FOUND!');
          }
        }
      });
    }
  }
  /**
   * Returns form
   */
  get form() {
    return this.employeeUpdateForm.controls;
  }
  /**
   * Bootstrap tooltip form validation submit method
   */
  formSubmit() {
    this.formsubmit = true;
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.employeeUpdateForm.controls;
  }
  /**
   * On submit updates form
   */
  onSubmitUpdate() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.employeeUpdateForm.invalid) {
      return;
    } else {
      this.doModify();
    }
  }
  /**
   * On submit updates form
   */
  doModify() {
    const mobileNo = '+91' + this.employeeUpdateForm.get('mobileNumber')!.value;
    const employeeObj: Employee = {
      firstName: this.employeeUpdateForm.get('firstName')!.value,
      lastName: this.employeeUpdateForm.get('lastName')!.value,
      address: this.employeeUpdateForm.get('address')!.value,
      state: this.employeeUpdateForm.get('state')!.value,
      city: this.employeeUpdateForm.get('city')!.value,
      zip: this.employeeUpdateForm.get('zip')!.value,
      mobileNumber: '+91' + this.employeeUpdateForm.get('mobileNumber')!.value,
      email: this.employeeUpdateForm.get('email')!.value,
      dateOfBirth: this.employeeUpdateForm.get('dateOfBirth')!.value,
      gender: this.employeeUpdateForm.get('gender')!.value,
      emergencyContactNumber: this.employeeUpdateForm.get(
        'emergencyContactNumber'
      )!.value,
      relationshipWithEmp: this.employeeUpdateForm.get('relationshipWithEmp')!
        .value,
      bankName: this.employeeUpdateForm.get('bankName')!.value,
      accountNumber: this.employeeUpdateForm.get('accountNumber')!.value,
      ifscCode: this.employeeUpdateForm.get('ifscCode')!.value,
      status: this.employeeUpdateForm.get('status')!.value,
      joiningDate: this.employeeUpdateForm.get('joiningDate')!.value,
      lastDate: this.employeeUpdateForm.get('lastDate')!.value,
      role: this.employeeUpdateForm.get('role')!.value,
      responsibility: this.employeeUpdateForm.get('responsibility')!.value,
      leaveTotal: this.employeeUpdateForm.get('leaveTotal')!.value,
      remainingLeaves: this.employeeUpdateForm.get('remainingLeaves')!.value,
    };

    this.modifyEmployeeCollection = this.fbstore.collection(
      'employees',
      (ref) => ref.where('mobileNumber', '==', mobileNo)
    );
    this.modifyEmployeeCollection
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((action) => {
            const data = action.payload.doc.data() as Employee;
            const id = action.payload.doc.id;
            return { id };
          })
        )
      )
      .subscribe((_doc: any) => {
        console.log(_doc);
        let id = _doc[0].id; //first result of query [0]
        this.updateMethod(id, employeeObj);
      });
  }
  /* Update Data
   */
  updateMethod(id: string, employeeObj: Partial<Employee>) {
    try {
      this.fbstore
        .doc('employees/' + id)
        .update(employeeObj)
        .then(() => {
          this.toastr.success(
            'Employee updated successfully in db!',
            'Great Job!'
          );
          this.showUpdateForm = false;
          this.submitted = false;
          this.updatedValue = true;
          this.employeeUpdateForm.reset();
          this.searchForm.reset();
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error);
        });
    } catch (error) {
      console.error('Error updating document: ', error);
      // this.toastr.success('Delete is not done in db!', 'Something went wrong!');
    }
  }
  /* Delete Data remove
   */
  deleteData() {
    console.log('delete');
    try {
      console.log(this.docid);
      this.fbstore
        .doc('employees/' + this.docid)
        .delete()
        .then(() => {
          console.log('Employee deleted Successfully');
          this.toastr.success(
            'Employee deleted successfully in db!',
            'Great Job!'
          );
          this.showUpdateForm = false;
          this.employeeUpdateForm.reset();
          this.searchForm.reset();
        });
    } catch (error) {
      console.error('Error removing document: ', error);
      // this.toastr.success('Delete is not done in db!', 'Something went wrong!');
    }
  }
}
