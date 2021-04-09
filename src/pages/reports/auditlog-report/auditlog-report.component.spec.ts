import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditlogReportComponent } from './auditlog-report.component';

describe('AuditlogReportComponent', () => {
  let component: AuditlogReportComponent;
  let fixture: ComponentFixture<AuditlogReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditlogReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditlogReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
