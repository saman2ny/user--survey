import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignMessageStatusSummayComponent } from './campaign-message-status-summay.component';

describe('CampaignMessageStatusSummayComponent', () => {
  let component: CampaignMessageStatusSummayComponent;
  let fixture: ComponentFixture<CampaignMessageStatusSummayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignMessageStatusSummayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignMessageStatusSummayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
