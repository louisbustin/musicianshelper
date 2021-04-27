import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetlistDetailsComponent } from './setlist-details.component';

describe('SetlistDetailsComponent', () => {
  let component: SetlistDetailsComponent;
  let fixture: ComponentFixture<SetlistDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetlistDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetlistDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
