import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandContextComponent } from './band-context.component';

describe('BandContextComponent', () => {
  let component: BandContextComponent;
  let fixture: ComponentFixture<BandContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandContextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
