import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TextLocalSmsService } from './sms-txt-local.service';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss'],
})

/**
 * Sms Component
 */
export class SmsComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  // Form submition
  submit!: boolean;
  formsubmit!: boolean;
  submitted = false;

  //  Sms form
  smsForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private textLocalSmsService: TextLocalSmsService
  ) {}

  ngOnInit(): void {
    /**
     * BreadCrumb Set
     */
    this.breadCrumbItems = [
      { label: 'Forms' },
      { label: 'Form Send SMS', active: true },
    ];

    /**
     * Bootstrap validation form data
     */
    this.initializeForm();

    this.submit = false;
    this.formsubmit = false;
  }

  initializeForm(): void {
    this.smsForm = new FormGroup({
      mobileNumbers: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
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
    return this.smsForm.controls;
  }

  /**
   * Bootstrap tooltip form validation submit method
   */
  formSubmit() {
    this.formsubmit = true;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.smsForm.controls;
  }

  /**
   * On submit form
   */
   sendTextLocalSMS() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.smsForm.invalid) {
      return;
    } else {
      const mobileNumberControl = this.smsForm.get('mobileNumbers')?.value;
      const messageControl = this.smsForm.get('message')?.value;

      let text_msg = messageControl;
      let toNumbers = [mobileNumberControl];
      let smsSent = this.textLocalSmsService.sendSMS(toNumbers, text_msg);

      return smsSent;
    }
  }
}


