import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMessageTemplateParametersComponent } from './add-message-template-parameters.component';

describe('AddMessageTemplateParametersComponent', () => {
  let component: AddMessageTemplateParametersComponent;
  let fixture: ComponentFixture<AddMessageTemplateParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMessageTemplateParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMessageTemplateParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
