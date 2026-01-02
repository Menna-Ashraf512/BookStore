import { Component, OnInit, signal } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { IAuth } from '../../../dashboard/interfaces/iauth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {

  isSpecialRoute = signal(false);
  isCustomer: boolean = false;

  constructor(
    private _router: Router,
    private _productService: ProductService,
    private _authService: AuthService
  ) {
  }
  ngOnInit(): void {
    this.specialRoute();
    this.checkUserRole();
  }

  checkUserRole(): void {
    const profile = this._authService.profileSubject.getValue();
    // console.log('Initial User Profile:', profile);
    this._authService.profileSubject.subscribe({
      next: (profile: IAuth) => {
        // console.log('User Profile:', profile);
        if (profile?.role === 'Customer') {
          this.isCustomer = true;
        } else {
          this.isCustomer = false;
        }
      }
    });
  }



  get cartCount() {
    return this._productService.cartCountSignal();
  }

  specialRoute() {
    this._router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.isSpecialRoute.set(event.url.includes('/home'));
      });
  }
  logOut() {
    localStorage.removeItem('token');
    this._authService.profileSubject.next({} as IAuth);
    this._router.navigate(['/auth/login']);
  }
}
