import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {Book} from '../model/book.model';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  totali:number;
  subscription: Subscription;
  

  constructor(private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router) { 
     
    }

  ngOnInit(): void {
    this.books = this.bookService.getAllBooks();
    this.totali = this.books.length;
    console.log(this.books);

    this.subscription = this.bookService.booksChanged.subscribe(
      (books: Book[]) =>{
        this.books = books;
        this.totali = this.books.length;
      }
    );

  }

  onEditItem(index){
    this.bookService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
