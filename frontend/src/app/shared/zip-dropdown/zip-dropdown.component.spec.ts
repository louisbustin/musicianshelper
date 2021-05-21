import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipDropdownComponent } from './zip-dropdown.component';

describe('ZipDropdownComponent', () => {
  let component: ZipDropdownComponent;
  let fixture: ComponentFixture<ZipDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZipDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
