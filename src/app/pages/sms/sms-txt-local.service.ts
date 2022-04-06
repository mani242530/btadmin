import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

/**
 * Text Local Sms - Service Component
 */
export class TextLocalSmsService {
  constructor(private __httpClient: HttpClient) {}

  async callApi(URL: any, BODY: any) {
    var options = {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      json: true,
    };

    let response = await this.__httpClient.post<any>(URL, options).subscribe({
      next: (result: any) => {
        console.log(`SMS API: ${URL} RESULT =`, result);
        return result;
      },
      error: (err: { message: any }) => {
        console.log(`SMS API: ${URL} ERROR =`, err.message);
        return err;
      },
    });
    return response;
  }

  async sendSMS(toNumbers: any[], rawMessage: string | number | boolean) {
    let url = 'http://api.textlocal.in/send/?';

    let sender = encodeURIComponent('BHARAT TRANSPORT');
    let encoded_message = encodeURIComponent(rawMessage);
    let body = {
      hash: '9e5b68225145bdcda8965fca245c0cd49a743099aa89da430fd5d7acd1cc9a12',
      apikey: 'NzQzMjcxNzE2Mjc3NjQ3YTMzMzk2YTUxNTg0ODM3NGI=',
      numbers: toNumbers.join(','),
      sender: sender,
      message: encoded_message,
    };
    let result = await this.callApi(url, body);
    return result;
  }
}
