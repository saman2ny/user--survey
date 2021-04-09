import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSystemParametersComponent } from './list-system-parameters.component';

describe('ListSystemParametersComponent', () => {
  let component: ListSystemParametersComponent;
  let fixture: ComponentFixture<ListSystemParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSystemParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSystemParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
