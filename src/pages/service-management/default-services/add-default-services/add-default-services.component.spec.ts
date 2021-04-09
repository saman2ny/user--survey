import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDefaultServicesComponent } from './add-default-services.component';

describe('AddDefaultServicesComponent', () => {
  let component: AddDefaultServicesComponent;
  let fixture: ComponentFixture<AddDefaultServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDefaultServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDefaultServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
