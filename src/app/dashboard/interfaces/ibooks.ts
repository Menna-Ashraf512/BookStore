export interface RootObject {
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  books: IBooks[];
}

export interface IBooks {
  id: number;
  title: string;
  authorName: string;
  description: string;
  publishingDate: string;
  imageUrl: string;
  imageThumbnailUrl: string;
  hall: string;
  price: number;
  stock: number;
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
  categoryImg: string;
}
export interface IdataBooks{
    bookName: string ,
  pageNumber: number ,
  pageSize: number ,
  sortDesc: boolean
}
