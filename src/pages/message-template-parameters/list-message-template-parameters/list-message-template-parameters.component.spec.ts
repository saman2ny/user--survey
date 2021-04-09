import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMessageTemplateParametersComponent } from './list-message-template-parameters.component';

describe('ListMessageTemplateParametersComponent', () => {
  let component: ListMessageTemplateParametersComponent;
  let fixture: ComponentFixture<ListMessageTemplateParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMessageTemplateParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMessageTemplateParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
