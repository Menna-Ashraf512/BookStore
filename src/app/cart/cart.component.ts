import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  items: any[] = [];
  products: any[] = [];
  cartCount: any;
  total: number = 0;
  Tax: number = 1.6;
  totalCost: number = 0;
  constructor(
    private _productService: ProductService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBasket();
  }

  getBasket() {
    this._productService.getMyBasket().subscribe((res) => {
      this.items = res.items;
      this.products = [];
      console.log(this.items);
      this.cartCount = this.items.filter((item) => item.quantity > 0).length;
      this.total = 0;
      this.totalCost = 0;
      this._productService.updateCartCount(this.cartCount);

      for (let item of this.items) {
        if (item.book && item.quantity > 0) {
          this._productService.getBookById(item.book).subscribe((res) => {
            const productWithQuantity = {
              res,
              quantity: item.quantity,
              bookId: item.book,
            };
            this.products.push(productWithQuantity);
            this.total += res.price * item.quantity;
            this.totalCost = this.total + this.Tax;
          });
        } else {
          console.log('no item');
        }
      }
    });
  }

  increaseQuantity(item: any) {
    item.quantity++;
    const payload = {
      book: item.res._id,
      quantity: 1,
    };

    this._productService.addItem(payload).subscribe({
      next: (res) => {
        this._toastrService.success('Increased this book');
        this.total += item.res.price;
        this.totalCost = this.total + this.Tax;
      },
      error: (err) => {
        this._toastrService.error('Could not increase this book');
        item.quantity--;
      },
    });
  }

decreaseQuantity(item: any) {
  if (item.quantity > 1) {
    item.quantity--;
    const payload = {
      book: item.res._id,
      quantity: 1,
    };

    this._productService.deleteItem(payload).subscribe({
      next: (res) => {
        this._toastrService.success('Decreased this book');
        this.total -= item.res.price;
        this.totalCost = this.total + this.Tax;
      },
      error: (err) => {
        this._toastrService.error('Could not decrease this book');
        item.quantity++;
      },
    });

  } else {
    this._productService.deleteItem({ book: item.res._id }).subscribe({
      next: (res) => {
        this._toastrService.success('Item removed completely');

        this.products = this.products.filter(
          (p) => p.res._id !== item.res._id
        );

        this.total -= item.res.price;
        this.totalCost = this.total + this.Tax;
      },
      error: (err) => {
        this._toastrService.error('Could not remove item');
      },
    });
  }
}


deleteItem(id: string) {
  const payload = { book: id };

  this._productService.deleteItem(payload).subscribe({
    next: (res) => {
      // ✅ امسحي من الـ products (UI)
      this.products = this.products.filter(p => p.res._id !== id);

      // ✅ احسبي التوتال من جديد
      this.total = this.products.reduce((acc, item) => acc + item.res.price * item.quantity, 0);
      this.totalCost = this.total + this.Tax;

      // ✅ قللي عدد المنتجات في السلة
      this.cartCount = this.products.length;
      this._productService.updateCartCount(this.cartCount);

      this._toastrService.success(res.message || 'Item removed');
    },
    error: (err) => {
      this._toastrService.error(err?.error?.message || 'Error deleting item');
    }
  });
}

}
