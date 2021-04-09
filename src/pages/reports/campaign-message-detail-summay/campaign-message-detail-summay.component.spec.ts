import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignMessageDetailSummayComponent } from './campaign-message-detail-summay.component';

describe('CampaignMessageDetailSummayComponent', () => {
  let component: CampaignMessageDetailSummayComponent;
  let fixture: ComponentFixture<CampaignMessageDetailSummayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignMessageDetailSummayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignMessageDetailSummayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
