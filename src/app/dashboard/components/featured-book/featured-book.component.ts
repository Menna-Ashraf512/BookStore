import { Component } from '@angular/core';
import { IBooks } from '../../interfaces/ibooks';
import { Router } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-featured-book',
  imports: [SlicePipe],
  templateUrl: './featured-book.component.html',
  styleUrl: './featured-book.component.scss',
  standalone: true
})
export class FeaturedBookComponent {

currentIndex = 0;
slides:IBooks[]= []
constructor (
  private _router:Router,
  private _productService:ProductService
){}

ngOnInit(): void {
    // this.getBooks()
}

// getBooks(){
//   this._productService.getAllBooks().subscribe({
//     next:(res)=>{
//         this.slides=res.data.slice(3, 6);
//       console.log(this.slides);

//     },
//   })
// }



prevSlide() {
  this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
}

nextSlide() {
  this.currentIndex = (this.currentIndex + 1) % this.slides.length;
}

goToSlide(index: number) {
  this.currentIndex = index;
}
}
