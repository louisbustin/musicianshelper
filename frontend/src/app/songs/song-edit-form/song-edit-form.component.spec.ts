import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongEditFormComponent } from './song-edit-form.component';

describe('SongEditFormComponent', () => {
  let component: SongEditFormComponent;
  let fixture: ComponentFixture<SongEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
