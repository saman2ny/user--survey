import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTemplateParametersComponent } from './add-template-parameters.component';

describe('AddTemplateParametersComponent', () => {
  let component: AddTemplateParametersComponent;
  let fixture: ComponentFixture<AddTemplateParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTemplateParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTemplateParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
