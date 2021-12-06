import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../model/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  book: Book;
  books : Book[] = [
    new Book("Il nome della rosa", "Umberto Eco"),
    new Book("L'idiota", "Fedor Dostoevskij")
  ];
  startedEditing = new Subject<number>();
  booksChanged = new Subject<Book[]>();
  constructor() { }

  getAllBooks(){
    return this.books;
  }

  deleteBook(editedItemIndex: number) {
    throw new Error('Method not implemented.');
  }
  addBook(newBook: Book) {
    console.log(newBook);
    this.books.push(newBook);
    this.booksChanged.next(this.books.slice());
  }
  updateBook(editedItemIndex: number, newBook: Book) {
    throw new Error('Method not implemented.');
  }
  getBook(index: number): Book {
    throw new Error('Method not implemented.');
  }
}
