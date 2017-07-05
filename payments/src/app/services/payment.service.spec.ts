// import { TestBed, inject } from '@angular/core/testing';
//
// import { PaymentService } from './payment.service';
//
// describe('PaymentService', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [PaymentService]
//     });
//   });
//
//   // it('should be created', inject([PaymentService], (service: PaymentService) => {
//   //   expect(service).toBeTruthy();
//   // }));
//
//
// });

import {fakeAsync, inject, TestBed} from '@angular/core/testing';
import {HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {PaymentService} from './payment.service'


const POMaterials = [
  {
    "_id": "58df0b6eb871fb811be65d2e",
    "_materialId": "58df0b6eb871fb811be65d2f",
    "priceSubtotal": 1200,
    "subtotalWithoutTax": 0.6,
    "group": "Underlayments",
    "description": null,
    "tax": 0.6,
    "price": 1200,
    "qty": 23,
    "per": "EA",
    "brand": "OC Weatherlock",
    "color": "red",
    "name": "10' SDE Drip Edge 1' Face Alum"
  },
  {
    "_materialId": "5925ba3eb871fb811be6de81",
    "priceSubtotal": 1200,
    "subtotalWithoutTax": 0.6,
    "group": "GAF Shingles",
    "description": null,
    "tax": 0.6,
    "price": 1200,
    "qty": 45,
    "per": "EA",
    "brand": "OC Weatherlock",
    "color": "red",
    "name": "Synthetic Underlayment (1 roll / 10 SQ)"
  },
  {
    "_materialId": "5925ba5cb871fb811be6de82",
    "priceSubtotal": 120,
    "subtotalWithoutTax": 0.6,
    "group": "Certainteed Shingles",
    "description": null,
    "tax": 0.6,
    "price": 200,
    "qty": 10,
    "per": "SQ",
    "brand": "OC Weatherlock",
    "color": "red",
    "name": "Synthetic Underlayment (1 roll / 10 SQ)"
  },
  {
    "_id": "58df0b6eb871fb811be65d2a",
    "_materialId": "5925ba89b871fb811be6de83",
    "priceSubtotal": 1200,
    "subtotalWithoutTax": 0.9,
    "group": "Certainteed Shingles",
    "description": null,
    "tax": 0.9,
    "price": 100,
    "qty": 4,
    "per": "BN",
    "brand": "OC Weatherlock",
    "color": "red",
    "name": "Synthetic Underlayment (1 roll / 10 SQ)"
  }
]


describe('Payment Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ //these provides will always be the same
        {
          provide: XHRBackend,
          useClass: MockBackend
        },
        PaymentService
      ]
    });
  });
  it('should make the right requests', fakeAsync(inject([XHRBackend, PaymentService], (mockBackend, POEstimate: PaymentService) => {
      const expectedUrl = 'http://localhost:4200/new_payments';
      mockBackend.connections.subscribe((connection: MockConnection) => {
          // Testing the request method and the expected url
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toBe(expectedUrl);
        });
    })
  ));

  // it('should get material items', fakeAsync(inject([XHRBackend, PaymentService], //fake post request
  //   (mockBackend, POService: PaymentService) => {
  //     mockBackend.connections.subscribe(
  //       (connection: MockConnection) => {
  //         // Mocking the response
  //         connection.mockRespond(new Response(
  //           new ResponseOptions({body: materialItems})
  //         ));
  //       });
  //     // Making the mock http request
  //     POService.getPurchaseOrderEstimateItems()
  //       .subscribe((res: Array<Material>) => {
  //         // Testing if res is of type Material
  //         expect(res[0] instanceof Material).toBeTruthy();
  //         expect(res[0].id).toBe('58df0b6eb871fb811be65d2f');
  //       });
  //   })
  // ));


  // Testing the methods that get the PO material values of the job
  // to populate the entire PO estimate form

  // it('should make the right getting the PO material values of the job', fakeAsync(inject([XHRBackend, PurchaseOrderEstimateService],
  //   (mockBackend, POEstimate: PurchaseOrderEstimateService) => {
  //     const expectedUrl = 'http://localhost:8080/api/estimate/get/purchase-orders/of/59013349386b1e2d44d59829';
  //     mockBackend.connections.subscribe(
  //       (connection: MockConnection) => {
  //         // Testing the request method and the expected url
  //         expect(connection.request.method).toBe(RequestMethod.Get);
  //         expect(connection.request.url).toBe(expectedUrl);
  //       });
  //   })
  // ));
  //
  // it('should get PO material values of the job', fakeAsync(inject([XHRBackend, PurchaseOrderEstimateService],
  //   (mockBackend, POService: PurchaseOrderEstimateService) => {
  //     mockBackend.connections.subscribe(
  //       (connection: MockConnection) => {
  //         // Mocking the response
  //         connection.mockRespond(new Response(
  //           new ResponseOptions({body: POMaterials})
  //         ));
  //       });
  //     // Making the mock http request
  //     POService.getPurchaseOrderValuesFromJobEstimate('59013349386b1e2d44d59829')
  //       .subscribe((res: Array<any>) => {
  //         // Testing if res is of type Material
  //         expect(res).toBeTruthy();
  //         expect(res[0]._materialId).toBe(POMaterials[0]._materialId);
  //       });
  //   })
  // ));
});
