import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {Book} from '../model/book.model';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[];

  

  constructor(private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router) { 

    }

  ngOnInit(): void {
    this.books = this.bookService.getAllBooks();
    console.log(this.books);


  }

  onEditItem(index){
    this.bookService.startedEditing.next(index);
    //this.router.navigate(['/insert'],{ state: { bookIndex: index } });
  }


}
