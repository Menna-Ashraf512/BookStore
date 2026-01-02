import { Routes } from '@angular/router';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(c => c.AuthModule) },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./dashboard/components/home/home.component').then(c => c.HomeComponent),
        canActivate: [authGuard]
      },
      {
        path: 'cart',
        loadComponent: () => import('./dashboard/components/cart/cart.component').then(c => c.CartComponent),
        canActivate: [authGuard]
      },
      {
        path: 'profile',
        loadComponent: () => import('./dashboard/components/profile/profile.component').then(c => c.ProfileComponent),
        canActivate: [authGuard]
      },
      {
        path: 'allProduct',
        loadComponent: () => import('./dashboard/components/all-product/all-product.component').then(c => c.AllProductComponent),
        canActivate: [authGuard]
      },
      {
        path: 'payment/:id',
        loadComponent: () => import('./dashboard/components/payment/payment/payment.component').then(c => c.PaymentComponent),
        canActivate: [authGuard]
      },
      {
        path: 'orders',
        loadComponent: () => import('./dashboard/components/orders/orders.component').then(c => c.OrdersComponent),
        canActivate: [authGuard]
      }
    ]
  }
];
