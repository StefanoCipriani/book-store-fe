import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../model/book.model';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {

  @ViewChild('f',{static:false}) slForm : NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Book;
  navigation: Navigation;

  constructor(private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router) { 
      this.navigation = this.router.getCurrentNavigation();
    }

  ngOnInit() {
    this.subscription = this.bookService.startedEditing.subscribe(
      (index: number) =>{
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.bookService.getBook(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          author:this.editedItem.author
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newBook = new Book(value.name, value.author);
    if(this.editMode){
      this.bookService.updateBook(this.editedItemIndex, newBook);
    }else{
      this.bookService.addBook(newBook);
    }
    this.editMode=false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.onClear();
    this.bookService.deleteBook(this.editedItemIndex);
  }

  ngOnDestroy(): void {
    console.log("onDestroy")
    this.subscription.unsubscribe();
  }

}
