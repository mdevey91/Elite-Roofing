import {Injectable} from "@angular/core";

@Injectable()
export class Payment {
  payment: number;
  date: any;
  constructor(newPayment, newDate){
    this.payment = newPayment;
    this.date = newDate;
  };
}
