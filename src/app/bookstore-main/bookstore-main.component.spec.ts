import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookstoreMainComponent } from './bookstore-main.component';

describe('BookstoreMainComponent', () => {
  let component: BookstoreMainComponent;
  let fixture: ComponentFixture<BookstoreMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookstoreMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookstoreMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
