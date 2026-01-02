import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent  implements OnInit  {
constructor(private _productService:ProductService){}
ordersList:any[]=[];
ngOnInit():void{
  this.getOrders();
}
getOrders(){
  this._productService.getOrders().subscribe((res)=>{
    this.ordersList=res;
    console.log(this.ordersList);
  });
}
}
