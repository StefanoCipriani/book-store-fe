import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private bookService: BookService) { }
  

  ngOnInit() {
    this.subscription = this.bookService.startedEditing.subscribe(
      (index: number) =>{
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.bookService.getBook(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.author
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
    this.subscription.unsubscribe();
  }

}
