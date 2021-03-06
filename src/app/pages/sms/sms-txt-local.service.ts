import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })

/**
 * Text Local Sms - Service Component
 */
export class TextLocalSmsService {
  constructor(
    private __httpClient: HttpClient,
    private toastr: ToastrService
  ) {}

  async callApi(data: any) {
    const textUrl = `${data.url}apikey=${data.apikey}&numbers=${data.numbers}&sender=${data.sender}&message=${data.message}`;
    // const textUrl =
    //   'https://api.textlocal.in/send/?apikey=NzQzMjcxNzE2Mjc3NjQ3YTMzMzk2YTUxNTg0ODM3NGI=&numbers=9986968800&sender=TXTLCL&message=' +
    //   encodeURIComponent('OTP to login to app is 123456');

    let response = await this.__httpClient.get<any>(textUrl).subscribe({
      next: (result: any) => {
        console.log(`SMS API: ${URL} RESULT =`, result);
        this.toastr.success('Sms sent successfully!', 'Great Job!');
        return result;
      },
      error: (err: { message: any }) => {
        console.log(`SMS API: ${URL} ERROR =`, err.message);
        this.toastr.error('Sms not sent successfully!', 'Great Job!');
        return err;
      },
    });
    return response;
  }

  async sendSMS(toNumbers: any[], rawMessage: string | number | boolean) {
    let sender = encodeURIComponent('PRIVID');
    let encoded_message = encodeURIComponent(rawMessage);
    let data = {
      url: 'https://api.textlocal.in/send/?',
      apikey: 'MzE2ZDc4Nzc2NjMyNGUzMzUwNDg1NzQ4MzY3NDRmN2E=',
      numbers: toNumbers.join(','),
      sender: sender,
      message: encoded_message,
    };
    let result = await this.callApi(data);
    return result;
  }
}
