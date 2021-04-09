import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCorporateComponent } from './add-corporate.component';

describe('AddCorporateComponent', () => {
  let component: AddCorporateComponent;
  let fixture: ComponentFixture<AddCorporateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCorporateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
