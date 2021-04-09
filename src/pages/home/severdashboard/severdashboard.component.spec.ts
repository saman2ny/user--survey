import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeverdashboardComponent } from './severdashboard.component';

describe('SeverdashboardComponent', () => {
  let component: SeverdashboardComponent;
  let fixture: ComponentFixture<SeverdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeverdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeverdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
