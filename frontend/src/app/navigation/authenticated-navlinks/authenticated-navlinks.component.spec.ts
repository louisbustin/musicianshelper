import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedNavlinksComponent } from './authenticated-navlinks.component';

describe('AuthenticatedNavlinksComponent', () => {
  let component: AuthenticatedNavlinksComponent;
  let fixture: ComponentFixture<AuthenticatedNavlinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticatedNavlinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatedNavlinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
