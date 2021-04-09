import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageStatisticsComponent } from './message-statistics.component';

describe('MessageStatisticsComponent', () => {
  let component: MessageStatisticsComponent;
  let fixture: ComponentFixture<MessageStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
