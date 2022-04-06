import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.scss'],
})

/**
 * Advertise Component
 */
export class AdvertiseComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  // Form submition
  submit!: boolean;
  formsubmit!: boolean;
  submitted = false;

  //  Advertise form
  advertiseForm!: FormGroup;

  CountryData: Array<any> = [
    { name: 'Pear', value: 'pear' },
    { name: 'Plum', value: 'plum' },
    { name: 'Kiwi', value: 'kiwi' },
    { name: 'Apple', value: 'apple' },
    { name: 'Lime', value: 'lime' },
  ];

  constructor(public formBuilder: FormBuilder) {}

  ngOnInit(): void {
    /**
     * BreadCrumb Set
     */
    this.breadCrumbItems = [
      { label: 'Forms' },
      { label: 'Form Advertise', active: true },
    ];

    /**
     * Bootstrap validation form data
     */
    this.advertiseForm = this.formBuilder.group({
      firstName: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
      ],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      state: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      zip: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    });

    this.submit = false;
    this.formsubmit = false;
  }

  /**
   * Bootsrap validation form submit method
   */
  validSubmit() {
    this.submit = true;
  }

  /**
   * Returns form
   */
  get form() {
    return this.advertiseForm.controls;
  }

  /**
   * Bootstrap tooltip form validation submit method
   */
  formSubmit() {
    this.formsubmit = true;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.advertiseForm.controls;
  }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.advertiseForm.invalid) {
      return;
    }
  }
}
