export class MockPaymentService{

  constructor(){}

  payments =
    [
      {payment: 45.34, date: new Date()},
      {payment: 99.99, date: new Date()},
      {payment: 1001.23, date: new Date()},
      {payment: 24.45, date: new Date()}
    ];

  addPayments(paymentInfo){
    return {success: true, msg: 'payment made', paymentInfo: paymentInfo};
  }

  getPayments(){
    return this.payments;
  }
}
