import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategroryMasterComponent } from './categrory-master.component';

describe('CategroryMasterComponent', () => {
  let component: CategroryMasterComponent;
  let fixture: ComponentFixture<CategroryMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategroryMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategroryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
