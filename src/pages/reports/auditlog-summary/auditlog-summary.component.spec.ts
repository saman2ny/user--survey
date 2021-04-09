import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditlogSummaryComponent } from './auditlog-summary.component';

describe('AuditlogSummaryComponent', () => {
  let component: AuditlogSummaryComponent;
  let fixture: ComponentFixture<AuditlogSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditlogSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditlogSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
