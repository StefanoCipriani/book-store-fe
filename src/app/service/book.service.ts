import { Injectable } from '@angular/core';
import { Book } from '../model/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  book: Book;
  books : Book[] = [];

  constructor() { }

  getAllBooks(){
    this.book = new Book("Il nome della rosa", "Umberto Eco");
    this.books.push(this.book)
    this.book = new Book("L'idiota", "Fedotr Dostojevsky");
    this.books.push(this.book)

    return this.books;
  }
}
