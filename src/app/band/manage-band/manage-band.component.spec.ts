import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBandComponent } from './manage-band.component';

describe('ManageBandComponent', () => {
  let component: ManageBandComponent;
  let fixture: ComponentFixture<ManageBandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
