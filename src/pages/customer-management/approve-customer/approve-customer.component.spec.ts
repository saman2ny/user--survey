import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCustomerComponent } from './approve-customer.component';

describe('ApproveCustomerComponent', () => {
  let component: ApproveCustomerComponent;
  let fixture: ComponentFixture<ApproveCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
