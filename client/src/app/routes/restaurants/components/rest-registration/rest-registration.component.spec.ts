import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestRegistrationComponent } from './rest-registration.component';

describe('RestRegistrationComponent', () => {
  let component: RestRegistrationComponent;
  let fixture: ComponentFixture<RestRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
