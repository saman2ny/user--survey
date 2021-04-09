import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSummaryDetailComponent } from './message-summary-detail.component';

describe('MessageSummaryDetailComponent', () => {
  let component: MessageSummaryDetailComponent;
  let fixture: ComponentFixture<MessageSummaryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageSummaryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageSummaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
