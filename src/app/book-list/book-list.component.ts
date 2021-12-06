import { Component, OnInit } from '@angular/core';
import {Book} from '../model/book.model';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.books = this.bookService.getAllBooks();
    console.log(this.books);
  }

  onEditItem(i){
    console.log("onEdit");
  }
}
