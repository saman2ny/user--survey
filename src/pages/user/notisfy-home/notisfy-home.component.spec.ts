import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotisfyHomeComponent } from './notisfy-home.component';

describe('NotisfyHomeComponent', () => {
  let component: NotisfyHomeComponent;
  let fixture: ComponentFixture<NotisfyHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotisfyHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotisfyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
