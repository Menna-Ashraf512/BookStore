import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isSpecialRoute = false;
  cartCount: number = 0;
  constructor(
    private _router: Router,
    private _productService: ProductService
  ) {
    this.specialRoute();
  }
  ngOnInit(): void {
    this._productService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
  }

  specialRoute() {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isSpecialRoute = event.url.includes('/home');
      }
    });
  }
}
