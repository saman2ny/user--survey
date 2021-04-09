import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMessageTemplatesComponent } from './list-message-templates.component';

describe('ListMessageTemplatesComponent', () => {
  let component: ListMessageTemplatesComponent;
  let fixture: ComponentFixture<ListMessageTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMessageTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMessageTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
