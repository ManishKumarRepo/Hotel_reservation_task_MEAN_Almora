import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookhotelComponent } from './bookhotel.component';

describe('BookhotelComponent', () => {
  let component: BookhotelComponent;
  let fixture: ComponentFixture<BookhotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookhotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookhotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
