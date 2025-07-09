import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SliderCategComponent } from "../components/slider-categ/slider-categ.component";
import { ProductService } from '../services/product.service';
import { IBooks } from '../interfaces/ibooks';
import { SlicePipe } from '@angular/common';
import { SliderBooksComponent } from "../components/slider-books/slider-books.component";
import { FeaturedBookComponent } from "../components/featured-book/featured-book.component";
import { OfferBookComponent } from "../components/offer-book/offer-book.component";
import { ArticlesComponent } from "../components/articles/articles.component";
import { SubscribeComponent } from "../components/subscribe/subscribe.component";
@Component({
  selector: 'app-home',
  imports: [SliderCategComponent, SlicePipe, SliderBooksComponent, FeaturedBookComponent, OfferBookComponent, ArticlesComponent, SubscribeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
currentIndex = 0;
slides:IBooks[]= []
constructor (
  private _router:Router,
  private _productService:ProductService
){}

ngOnInit(): void {
    this.getBooks()
}

getBooks(){
  this._productService.getAllBooks().subscribe({
    next:(res)=>{
        this.slides=res.data.slice(3, 6);
    },
  })
}



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
