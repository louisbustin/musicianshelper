import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSetlistComponent } from './add-setlist.component';

describe('AddSetlistComponent', () => {
  let component: AddSetlistComponent;
  let fixture: ComponentFixture<AddSetlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSetlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSetlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
