import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}
private cartCountSource = new BehaviorSubject<number>(0);
cartCount$ = this.cartCountSource.asObservable();        

updateCartCount(count: number) {
  this.cartCountSource.next(count); 
}
  getAllBooks(): Observable<any> {
    return this.httpClient.get(`book`);
  }
  getAllCategory(): Observable<any> {
    return this.httpClient.get(`category`);
  }
  addItem(data:any):Observable<any>{
    return this.httpClient.post(`basket/item`,data)
  }
  deleteItem(data:any):Observable<any>{
    return this.httpClient.delete(`basket/item`,{
      body:data
    })
  }
  updateItem(data:any,id:any):Observable<any>{
    return this.httpClient.delete(`basket/${id}`,data)
  }
  getMyBasket():Observable<any>{
    return this.httpClient.get(`basket`)
  }
  getBookById(id:number):Observable<any>{
    return this.httpClient.get(`book/${id}`)
  }
}
