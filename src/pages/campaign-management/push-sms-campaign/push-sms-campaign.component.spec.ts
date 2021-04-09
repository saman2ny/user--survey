import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PushSmsCampaignComponent } from './push-sms-campaign.component';

describe('PushSmsCampaignComponent', () => {
  let component: PushSmsCampaignComponent;
  let fixture: ComponentFixture<PushSmsCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushSmsCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushSmsCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
