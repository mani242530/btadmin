import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})

/**
 * Bootstrap Basic Component
 */
export class EmployeeListComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  totalEmployeesCount = 0;
  totalEmployees!: any;
  getEmployees!: Observable<any>;
  employeesCollection!: AngularFirestoreCollection<any>;

  constructor(
    private spinner: NgxSpinnerService,
    private fbstore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    /**
     * BreadCrumb Set
     */
    this.breadCrumbItems = [
      { label: 'Tables' },
      { label: 'Employee List', active: true },
    ];

    this.fetchData();
  }

  /**
   * Fetches the data
   */
  private fetchData() {
    try {
      this.spinner.show();
      this.employeesCollection = this.fbstore.collection(
        'employees',
        (ref) => ref
      );
      this.getEmployees = this.employeesCollection.snapshotChanges().pipe(
        map((actions) => {
          return actions.map((action) => {
            const data = action.payload.doc.data();
            return {
              id: action.payload.doc.id,
              fullName: data.firstName + '' + data.lastName,
              city: data.city,
              mobileNumber: data.mobileNumber,
              email: data.email,
              joiningDate: data.joiningDate,
              role: data.role,
              status: data.status,
            };
          });
        })
      );

      this.getEmployees.subscribe((snapshot) => {
        this.spinner.hide();
        if (snapshot.length === 0) {
          console.log('No Employees');
        } else {
          console.log(snapshot);
          this.totalEmployeesCount = snapshot.length;
          this.totalEmployees = snapshot;
        }
      });
    } catch (error) {
      this.spinner.hide();
      this.toastr.error('Something went wrong. Please check after some time!');
    }
  }
}
