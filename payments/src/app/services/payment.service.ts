import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PaymentService {

  paymentInfo: any;

  constructor(private http: Http) { }

  addPayment(paymentInfo){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/new_payment', paymentInfo, {headers: headers}).map(res => res.json()); //map(res => res.json() returns an array of json objects or else you would get a long string of data
  }

  getPayments(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/payments', {headers: headers}) //there is not user because we are not sending data, we are receiving
      .map(res => res.json());
  }

}
