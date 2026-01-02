import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { IdataBooks } from '../../dashboard/interfaces/ibooks';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {
    // this.refreshCartCount();
  }

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  cartCountSignal = toSignal(this.cartCount$);


  updateCartCount(count: number) {
    this.cartCountSubject.next(count);
  }
  refreshCartCount() {
    this.getMyBasket().subscribe((res) => {
      const count = res.items.filter((item: any) => item.quantity > 0).length;
      this.updateCartCount(count);
    });
  }
  getAllBooks(data: IdataBooks): Observable<any> {
    const params: Record<string, string | number | boolean> = {
      bookName: data.bookName,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      sortDesc: data.sortDesc
    };

    return this.httpClient.get(`Book/getBooks`, { params });
  }
  getAllCategory(): Observable<any> {
    return this.httpClient.get(`Book/getBooks?bookName=&pageNumber=1&pageSize=10&sortDesc=false`);
  }
  addItem(data: any): Observable<any> {
    return this.httpClient.post(`basket/item`, data).pipe(
      tap(() => {
        this.refreshCartCount();
      })
    )
  }

  deleteItem(data: any): Observable<any> {
    return this.httpClient.delete(`basket/item`, {
      body: data
    }).pipe(
      tap(() => {
        this.refreshCartCount();
      })
    )
  }
  updateItem(data: any, id: any): Observable<any> {
    return this.httpClient.delete(`basket/${id}`, data)
  }
  getMyBasket(): Observable<any> {
    return this.httpClient.get(`basket`)
  }
  getBookById(id: number): Observable<any> {
    return this.httpClient.get(`book/${id}`)
  }

  payment(basketId: string, data: any): Observable<any> {
    return this.httpClient.post(`order/${basketId}`, data);
  }
  getOrders(): Observable<any> {
    return this.httpClient.get(`order/my`);
  }
}
