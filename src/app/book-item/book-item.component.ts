import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Author } from '../model/author.model';
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
          author:this.editedItem.author.name + ' ' + this.editedItem.author.surname,
          editore: this.editedItem.editore
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
    const value = form.value;
    const autorName = value.author.split(" ")[0] == undefined ? "" : (value.author.split(" ")[0]).trim();
    const autorSurname = value.author.split(" ")[1] == undefined ? "" : (value.author.split(" ")[1]).trim();
    const author = new Author(null,autorName, autorSurname);
    const newBook = new Book(null, value.name.trim(), author, value.editore.trim());
console.log("fdf");
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
