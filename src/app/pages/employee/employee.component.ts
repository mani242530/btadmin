import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employees } from 'src/app/core/models/employees';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})

/**
 * Employee Component
 */
export class EmployeeComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  // Form submition
  submit!: boolean;
  formsubmit!: boolean;
  submitted = false;
  employeeExists = false;

  //  Employee form
  employeeForm!: FormGroup;

  filteredEmployee!: Observable<any>;

  employeesNewCollection!: AngularFirestoreCollection<Employees>;

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
      { label: 'Form Employee', active: true },
    ];

    /**
     * Bootstrap validation form data
     */
    this.employeeForm = this.formBuilder.group({
      firstName: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
      ],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      state: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      zip: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      mobilenumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      emergencyContactNumber: ['', [Validators.required]],
      relationshipWithEmp: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
      ],
      bankName: ['', [Validators.required]],
      accountNumber: ['', [Validators.required]],
      ifscCode: ['', [Validators.required]],
      status: ['', [Validators.required]],
      joiningDate: ['', [Validators.required]],
      lastDate: ['', [Validators.required]],
      role: ['', [Validators.required]],
      responsibility: ['', [Validators.required]],
      leaveTotal: ['', [Validators.required]],
      remainingLeaves: ['', [Validators.required]],
    });

    this.submit = false;
    this.formsubmit = false;
  }

  /**
   * Bootsrap validation form submit method
   */
  validSubmit() {
    this.submit = true;
    console.log('submit');
  }

  /**
   * Returns form
   */
  get form() {
    return this.employeeForm.controls;
  }

  /**
   * Bootstrap tooltip form validation submit method
   */
  formSubmit() {
    this.formsubmit = true;
    console.log('submit');
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.employeeForm.controls;
  }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.employeeForm.invalid) {
      return;
    } else {
      this.createEmployeeFireStore();
    }
  }

  createEmployeeFireStore() {
    const employeeObj: Employees = {
      firstName: this.employeeForm.get('firstName')!.value,
      lastName: this.employeeForm.get('lastName')!.value,
      address: this.employeeForm.get('address')!.value,
      city: this.employeeForm.get('city')!.value,
      state: this.employeeForm.get('state')!.value,
      zip: this.employeeForm.get('zip')!.value,
      mobileNumber: '+91' + this.employeeForm.get('mobilenumber')!.value,
      email: this.employeeForm.get('email')!.value,
      dateOfBirth: this.employeeForm.get('dateOfBirth')!.value,
      gender: this.employeeForm.get('gender')!.value,
      emergencyContactNumber: this.employeeForm.get('emergencyContactNumber')!
        .value,
      relationshipWithEmp: this.employeeForm.get('relationshipWithEmp')!.value,
      bankName: this.employeeForm.get('bankName')!.value,
      accountNumber: this.employeeForm.get('accountNumber')!.value,
      ifscCode: this.employeeForm.get('ifscCode')!.value,
      status: this.employeeForm.get('status')!.value,
      joiningDate: this.employeeForm.get('joiningDate')!.value,
      lastDate: this.employeeForm.get('lastDate')!.value,
      role: this.employeeForm.get('role')!.value,
      responsibility: this.employeeForm.get('responsibility')!.value,
      leaveTotal: this.employeeForm.get('leaveTotal')!.value,
      remainingLeaves: this.employeeForm.get('remainingLeaves')!.value,
    };
    Object.keys(employeeObj).forEach((k) => {
      if (typeof [k as keyof Employees] !== 'object') {
        [k as keyof Employees] = [k.trim() as keyof Employees];
      }
    });

    if (employeeObj) {
      this.employeesNewCollection = this.fbstore.collection(
        'employees',
        (ref) => ref.where('mobileNumber', '==', employeeObj.mobileNumber)
      );
      this.filteredEmployee = this.employeesNewCollection
        .snapshotChanges()
        .pipe(
          map((actions) => {
            return actions.map((action) => {
              const data = action.payload.doc.data() as Employees;
              return {
                id: action.payload.doc.id,
              };
            });
          })
        );

      this.filteredEmployee.subscribe((snapshot) => {
        if (snapshot.length === 0) {
          console.log('Employee NOT found');

          this.employeesNewCollection.add(employeeObj).then((data) => {
            if (data) {
              this.employeeExists = false;
              console.log('Employee added in db');
              // this.toastr.success(
              //   'Employee Details saved successfully!',
              //   'Good Job!'
              // );
            }
          });
        } else {
          console.log('Employee found' + snapshot[0].id);
          // this.toastr.error(
          //   'Employee Details is avaibale in our db!',
          //   'Please try again!'
          // );
          // this.employeeForm.reset();
        }
      });
    }
  }
}
