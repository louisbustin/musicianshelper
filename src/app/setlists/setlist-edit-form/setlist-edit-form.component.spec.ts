import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetlistEditFormComponent } from './setlist-edit-form.component';

describe('SetlistEditFormComponent', () => {
  let component: SetlistEditFormComponent;
  let fixture: ComponentFixture<SetlistEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetlistEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetlistEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
