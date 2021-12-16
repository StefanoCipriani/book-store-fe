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
    this.books.splice(editedItemIndex,1)
    this.booksChanged.next(this.books.slice())
  }
  addBook(newBook: Book) {
    console.log(newBook);
    this.books.push(newBook);
    this.booksChanged.next(this.books.slice());
  }
  updateBook(editedItemIndex: number, newBook: Book) {
    console.log("updateBook"+ newBook)
    this.books[editedItemIndex] = newBook;
    
  }
  getBook(index: number): Book {
    return this.books[index];
  }
}
