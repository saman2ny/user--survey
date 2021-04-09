import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebToSMSComponent } from './web-to-sms.component';

describe('WebToSMSComponent', () => {
  let component: WebToSMSComponent;
  let fixture: ComponentFixture<WebToSMSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebToSMSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebToSMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
