import { Component, OnInit } from '@angular/core';
import {PaymentService} from "../../services/payment.service";
import { Payment } from "../../models/Payment"
import {FlashMessagesService} from 'angular2-flash-messages';
import {isUndefined} from "util";
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  allPayments: Payment[];
  newPayment: number;
  newDate: Date;


  form: FormGroup;

  constructor(public paymentService: PaymentService, public flashMessage: FlashMessagesService, public fb: FormBuilder) {
    this.form = this.fb.group({
      payment: ['', Validators.required],
      date:''
    });
  }

  ngOnInit() {
    this.paymentService.getPayments().subscribe((data) => {
      console.log(data);
      this.allPayments = data;

    }, error => console.log(error, 'there was an error with your connection'));
  }

  submitPayment(){
    console.log(this.form.value);
    if(this.form.status === "VALID"){
      console.log(this.form.status + " should be valid");
      if(this.form.value.date === "" || isUndefined(this.form.value.date)){
        this.newDate = new Date();
      }
      else{
        this.newDate = this.form.value.date;
      }
      let newPay:Payment = new Payment(this.form.value.payment, this.newDate);
      this.allPayments.unshift(newPay); //unshift is like push but it puts the thing at the front of the array
      this.paymentService.addPayment(newPay).subscribe();
    }
    else{
      this.flashMessage.show('fill in all the fields', {cssClass: 'alert-danger text-center', timeout: 3000});
    }
  }
}
