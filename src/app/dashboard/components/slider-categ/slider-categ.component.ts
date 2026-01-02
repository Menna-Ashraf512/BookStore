import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../interfaces/icategory';
import { CarouselModule} from 'ngx-owl-carousel-o';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-slider-categ',
  imports: [CarouselModule],
  templateUrl: './slider-categ.component.html',
  styleUrl: './slider-categ.component.scss',
  standalone: true
})
export class SliderCategComponent implements OnInit {
  categories:ICategory[] = [];
groupedSlides: any[][] = [];

currentIndex = 0;

 constructor(private http: HttpClient,private _productService:ProductService) {}
 ngOnInit(): void {
     this.getCategories()
 }


getCategories() {
  this._productService.getAllCategory().subscribe({
    next: (res) => {
      this.categories = res.slice(0,6);
      this.groupedSlides = this.chunkArray(this.categories, 3);
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


prevSlide() {
  this.currentIndex = (this.currentIndex - 1 + this.groupedSlides.length) % this.groupedSlides.length;
}

nextSlide() {
  this.currentIndex = (this.currentIndex + 1) % this.groupedSlides.length;
}

}
