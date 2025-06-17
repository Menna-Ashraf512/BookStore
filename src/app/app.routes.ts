import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {path:'',redirectTo:'auth',pathMatch:'full'},
      {path:'auth',loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule) },
      {path:'home',loadComponent:()=>import('./home/home.component').then(m=>m.HomeComponent) ,canActivate:[authGuard]},
      {path:'cart',loadComponent:()=>import('./cart/cart.component').then(m=>m.CartComponent) ,canActivate:[authGuard]},
      {path:'allProduct',loadComponent:()=>import('./all-product/all-product.component').then(m=>m.AllProductComponent),canActivate:[authGuard] },

];
