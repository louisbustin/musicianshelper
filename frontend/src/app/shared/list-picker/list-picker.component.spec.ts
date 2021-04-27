import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPickerComponent } from './list-picker.component';

describe('ListPickerComponent', () => {
  let component: ListPickerComponent;
  let fixture: ComponentFixture<ListPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
