import { async, ComponentFixture, TestBed, getTestBed, fakeAsync } from '@angular/core/testing';
import { PaymentComponent } from './payment.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {PaymentService} from "../../services/payment.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {MockFlashMessagesService} from "./MockFlashMessagesService";
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from "@angular/platform-browser-dynamic/testing";
import {destroyPlatform} from "@angular/core";
import {Observable} from "rxjs/Observable";

class MockPaymentService{

  payments =
    [
      {payment: 45.34, date: new Date()},
      {payment: 99.99, date: new Date()},
      {payment: 1001.23, date: new Date()},
      {payment: 24.45, date: new Date()}
    ];



  addPayments(paymentInfo){
    return new Observable(observer => observer.next({success: true, msg: 'payment made', paymentInfo: paymentInfo}));
  }

  getPayments(){
    return new Observable(observer => observer.next(this.payments));
  }
}


// beforeEach(() => {}) happens before each test
// afterEach(() => {}) happens after each test
// beforeAll(() => {}) happens once before all the tests

describe('PaymentComponent', () => {

  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(()	=>	destroyPlatform());

  beforeEach(async(() => {
    //should initialize out components inside the before each

    TestBed.configureTestingModule({
      declarations: [ PaymentComponent ],
      imports: [ReactiveFormsModule, FormsModule, BrowserModule],
      providers: [{provide: PaymentService, useClass: MockPaymentService}, {provide: FlashMessagesService, useClass: MockFlashMessagesService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function updateForm(newPayment, newDate) {
    component.form.controls['payment'].setValue(newPayment);
    component.form.controls['date'].setValue(newDate);
  }

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get info from service', () => {
    expect(component.allPayments.length).toBe(4);
  });

  it('should be able to add new payments', () => {
    component.submitPayment();
    expect(component.form.value.payment).toBe("");
    expect(component.form.valid).toBeFalsy();
  });

  it('form value should update from form changes', fakeAsync(() => {
    updateForm(32.53, '');
    expect(component.form.value.payment).toEqual(32.53);
  }));

});
