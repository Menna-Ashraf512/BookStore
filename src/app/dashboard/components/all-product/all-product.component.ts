import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router";
import { IBooks } from '../../interfaces/ibooks';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-all-product',
  imports: [RouterLink],
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss'],
})
export class AllProductComponent implements OnInit {
  isGrid = true;
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 6;
  currentIndex = 0;
  slides: IBooks[] = [];
  messageSuccess: string = '';

  constructor(
    private _productService: ProductService,
    private _toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    // this.getAllBooks();
  }
  // filter
  filters = [
    { title: 'Price', open: false },
    { title: 'Product type', open: false },
    { title: 'Availability', open: false },
    { title: 'Brand', open: false },
    { title: 'Color', open: false },
    { title: 'Material', open: false },
  ];
  toggle(filter: any): void {
    filter.open = !filter.open;
  }

  // slider

  get totalPages(): number[] {
    const totalItems = this.slides?.length ?? 0;
    const pageSize = this.itemsPerPage || 1;
    const total = Math.ceil(totalItems / pageSize);

    return Array.from({ length: total }, (_, i) => i + 1);
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.slides.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages.length) {
      this.currentPage = page;
    }
  }
  // logic
  // getAllBooks() {
  //   this._productService.getAllBooks().subscribe({
  //     next: (res) => {
  //       this.slides = res.data;
  //       this.currentPage = 1;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching books:', err);
  //     },
  //   });
  // }
  addItem(id: string) {
    this.isLoading = true;
    const body = {
      book: id,
      quantity: 1,
    };
    this._productService.addItem(body).subscribe({
      next: (res) => {
        this.messageSuccess = res.message;
        console.log(body)
      },
      error: (err) => {
        this._toastrService.error(err.message,'sorry');
      },
      complete: () => {
        this.isLoading = false;
        this._toastrService.success(this.messageSuccess,'Success');
      },
    });
  }
}
