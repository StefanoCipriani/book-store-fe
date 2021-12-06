import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/recipes', pathMatch: 'full' },
  //{ path: '', component: AppComponent },
  { path: 'book-store', component: BookListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
