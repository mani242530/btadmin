import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  dataTableSortableDirective,
  SortEvent
} from './datatable-sortable.directive';
import { Table } from './datatable.model';
import { DataTableService } from './datatable.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  providers: [DataTableService, DecimalPipe],
})

/**
 * Datatable Component
 */
export class DatatableComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  @ViewChildren(dataTableSortableDirective)
  headers!: QueryList<dataTableSortableDirective>;

  hideme: boolean[] = [];
  tables$!: Observable<Table[]>;
  total$!: Observable<number>;

  company: any;
  getCompanys!: Observable<any>;
  companysCollection!: AngularFirestoreCollection<Table>;

  tableData!: Table[];
  totalData!: number;

  constructor(
    public service: DataTableService,
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
      { label: 'Tables' },
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
              paymentStatus: data.paymentStatus,
              accountStatus: data.accountStatus,
              firmActivity: data.firmActivity,
              companyName: data.companyName,
              ownerName: data.ownerName,
              vehicleType: data.vehicleType,
              mobileNumber: data.mobileNumber,
              alternateMobileNumber: data.alternateMobileNumber,
              location: data.location,
              serviceProvidedLocation: data.serviceProvidedLocation,
              referenceName: data.referenceName,
              vehicleNos: data.vehicleNos,
              language: data.language,
              aadharNumber: data.aadharNumber,
              drivingLicenseNumber: data.drivingLicenseNumber,
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
  onSort({ column, direction }: SortEvent) {
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
