import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Author } from '../model/author.model';
import { Book } from '../model/book.model';
import { HttpClient } from '@angular/common/http';
import { BookDb } from '../model/books.db.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  book: Book;
  books : Book[];
  /*
  books : Book[] = [
    new Book(null,"Il nome della rosa", new Author(null, "Umberto","Eco"),"Editore0"),
    new Book(null,"L'idiota", new Author(null, "Fedor","Dostoevskij"), "Editore1")
  ];*/
  startedEditing = new Subject<number>();
  booksChanged = new Subject<Book[]>();
  constructor(private http: HttpClient) { }

  getAllBooks(){
    this.onFetchBook();
    console.log("booksPopulated")
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
    //Persist
  }
  updateBook(editedItemIndex: number, newBook: Book) {
    console.log("updateBook"+ newBook)
    this.books[editedItemIndex] = newBook;
    this.booksChanged.next(this.books.slice());
    //persist
  }
  getBook(index: number): Book {
    return this.books[index];
  }

  onCreateBook(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post(
        'https://ng-complete-guide-c56d3.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchBook() {
    this.http
      .get<BookDb[]>(
        'http://localhost:7080/book-store/books'
      )
      .pipe(map(books =>{
          return books.map(book =>{
            let autoreModel = new Author(book.isbn, book.autori[0].nome, book.autori[0].cognome);
            let bookModel = new Book(book.isbn, book.titolo, autoreModel, book.editore);
            return bookModel;
          });
      }))
      .subscribe(booksArray => {
        this.books = booksArray;
      });
  }
}
