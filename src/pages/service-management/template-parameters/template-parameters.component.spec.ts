import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateParametersComponent } from './template-parameters.component';

describe('TemplateParametersComponent', () => {
  let component: TemplateParametersComponent;
  let fixture: ComponentFixture<TemplateParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
