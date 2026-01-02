import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IBooks, IdataBooks } from '../../interfaces/ibooks';
import { SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-slider-books',
  imports: [RouterLink],
  templateUrl: './slider-books.component.html',
  styleUrl: './slider-books.component.scss',
  standalone: true
})
export class SliderBooksComponent {

slides:IBooks[]= []
groupedSlides: any[][] = [];
currentIndex = 0;

 constructor(private http: HttpClient,private _productService:ProductService) {}
 ngOnInit(): void {
     this.getBooks()
 }


getBooks() {
    const params: IdataBooks = {
    bookName: '',
    pageNumber: 1,
    pageSize: 10,
    sortDesc: false
  };
  this._productService.getAllBooks(params).subscribe({
    next: (res) => {
      this.slides = res;
      console.log(this.slides);
      this.groupedSlides = this.chunkArray(this.slides, 4);
    }
  });
}

chunkArray(array: any[], size: number): any[][] {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
goToSlide(index: number) {
  this.currentIndex = index;
}
}
