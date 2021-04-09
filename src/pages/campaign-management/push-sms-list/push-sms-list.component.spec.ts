import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PushSmsListComponent } from './push-sms-list.component';

describe('PushSmsListComponent', () => {
  let component: PushSmsListComponent;
  let fixture: ComponentFixture<PushSmsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushSmsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushSmsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
