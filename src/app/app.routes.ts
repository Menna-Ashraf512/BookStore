import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',redirectTo:'auth',pathMatch:'full'},
      {path:'auth',loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule) },
      {path:'home',loadComponent:()=>import('./home/home.component').then(m=>m.HomeComponent) },
      {path:'cart',loadComponent:()=>import('./cart/cart.component').then(m=>m.CartComponent) },
      {path:'allProduct',loadComponent:()=>import('./all-product/all-product.component').then(m=>m.AllProductComponent) },

];
