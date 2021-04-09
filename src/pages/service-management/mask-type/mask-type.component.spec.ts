import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskTypeComponent } from './mask-type.component';

describe('MaskTypeComponent', () => {
  let component: MaskTypeComponent;
  let fixture: ComponentFixture<MaskTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaskTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaskTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
