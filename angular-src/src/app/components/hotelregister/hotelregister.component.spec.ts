import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelregisterComponent } from './hotelregister.component';

describe('HotelregisterComponent', () => {
  let component: HotelregisterComponent;
  let fixture: ComponentFixture<HotelregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
