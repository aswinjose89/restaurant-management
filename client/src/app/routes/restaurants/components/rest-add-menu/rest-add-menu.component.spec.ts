import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestAddMenuComponent } from './rest-add-menu.component';

describe('RestAddMenuComponent', () => {
  let component: RestAddMenuComponent;
  let fixture: ComponentFixture<RestAddMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestAddMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestAddMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
