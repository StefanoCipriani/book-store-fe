import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookstoreMainComponent } from './bookstore-main/bookstore-main.component';
import { BookListComponent } from './book-list/book-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BookstoreMainComponent,
    BookListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [HttpClientModule,],
  bootstrap: [AppComponent]
})
export class AppModule { }
