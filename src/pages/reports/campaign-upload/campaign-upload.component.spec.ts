import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignUploadComponent } from './campaign-upload.component';

describe('CampaignUploadComponent', () => {
  let component: CampaignUploadComponent;
  let fixture: ComponentFixture<CampaignUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
