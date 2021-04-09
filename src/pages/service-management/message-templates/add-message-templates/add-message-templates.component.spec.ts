import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMessageTemplatesComponent } from './add-message-templates.component';

describe('AddMessageTemplatesComponent', () => {
  let component: AddMessageTemplatesComponent;
  let fixture: ComponentFixture<AddMessageTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMessageTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMessageTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
