import { IBooks } from "./ibooks"

export interface ICategory {
      _id: string
  title: string
  status: string
  books: IBooks[]
}
