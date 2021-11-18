import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestMenuListComponent } from './rest-menu-list.component';

describe('RestMenuListComponent', () => {
  let component: RestMenuListComponent;
  let fixture: ComponentFixture<RestMenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestMenuListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
