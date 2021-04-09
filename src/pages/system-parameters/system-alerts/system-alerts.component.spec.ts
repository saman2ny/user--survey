import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAlertsComponent } from './system-alerts.component';

describe('SystemAlertsComponent', () => {
  let component: SystemAlertsComponent;
  let fixture: ComponentFixture<SystemAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
