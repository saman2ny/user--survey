import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTemplateParametersComponent } from './list-template-parameters.component';

describe('ListTemplateParametersComponent', () => {
  let component: ListTemplateParametersComponent;
  let fixture: ComponentFixture<ListTemplateParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTemplateParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTemplateParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
