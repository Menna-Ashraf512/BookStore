import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import {
  injectStripe,
  StripeElementsDirective,
  StripeCardComponent
} from 'ngx-stripe';
import {
  StripeElementsOptions,
  StripeCardElementOptions
} from '@stripe/stripe-js';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-payment',
  imports: [
    ReactiveFormsModule,
    StripeElementsDirective,
    StripeCardComponent
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  constructor(
    private _productService: ProductService,
    private _toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }
  basketId!: string;
  tokenId!: string;
  @ViewChild(StripeCardComponent) cardElement!: StripeCardComponent;
  ngOnInit(): void {
    this.basketId = this._activatedRoute.snapshot.paramMap.get('id') as string;

  }
  private readonly fb = inject(UntypedFormBuilder);

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  checkoutForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });

  // Replace with your own public key
  stripe = injectStripe('pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8');


  createToken() {
    const name = this.checkoutForm.get('name')?.value;
    this.stripe
      .createToken(this.cardElement.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          const payload = {
            token: result.token.id,
            delivery_address: {
              country: "Egypt",
              city: "Giza",
              state: "Giza",
              building: 25,
              street: "ayhaga",
              floor: 1,
              appartment: 1,
              mobile: "01004444444",
              additional_info: "ayhaga",
              location: {
                type: "Point",
                coordinates: [30.0444, 31.2357]
              }
            }
          };
          this._productService.payment(this.basketId, payload).subscribe({
            next: (res) => {
              this._toastrService.success('Payment successful');
              this._router.navigate(['/']);
            },
            error: (err) => {
              this._toastrService.error('Payment failed');
            }
          })
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }
}
