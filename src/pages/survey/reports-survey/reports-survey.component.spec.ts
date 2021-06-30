import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsSurveyComponent } from './reports-survey.component';

describe('ReportsSurveyComponent', () => {
  let component: ReportsSurveyComponent;
  let fixture: ComponentFixture<ReportsSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
