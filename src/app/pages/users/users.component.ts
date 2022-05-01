import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { usersSortableDirective, SortEvent } from './users-sortable.directive';
import { Users } from './users.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService, DecimalPipe],
})

/**
 * Users Component
 */
export class UsersComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  @ViewChildren(usersSortableDirective)
  headers!: QueryList<usersSortableDirective>;

  hideme: boolean[] = [];
  tables$!: Observable<Users[]>;
  total$!: Observable<number>;

  company: any;
  getCompanys!: Observable<any>;
  companysCollection!: AngularFirestoreCollection<Users>;

  tableData!: Users[];
  totalData!: number;

  constructor(
    public service: UsersService,
    private fbstore: AngularFirestore,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    /**
     * BreadCrumb Set
     */
    this.breadCrumbItems = [
      { label: 'Users' },
      { label: 'DataTables', active: true },
    ];

    /***
     * All Data Get
     */
    this._fetchData();
  }

  /**
   * fetches the table value
   */
  _fetchData() {
    this.getFirebaseData();
  }

  /**
   * fetches the table from firebase
   */
  getFirebaseData() {
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
            };
          });
        })
      );

      this.getCompanys.subscribe((snapshot) => {
        this.spinner.hide();
        if (snapshot.length === 0) {
          this.tableData = [];
        } else {
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
   * @param param0 sort the column
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
}
