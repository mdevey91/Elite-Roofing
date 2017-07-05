import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentService } from './services/payment.service';

@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    FlashMessagesModule,
    ReactiveFormsModule
  ],
  providers: [PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
