import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafelistComponent } from './safelist.component';

describe('SafelistComponent', () => {
  let component: SafelistComponent;
  let fixture: ComponentFixture<SafelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
