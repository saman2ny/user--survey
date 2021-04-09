import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMaskComponent } from './list-mask.component';

describe('ListMaskComponent', () => {
  let component: ListMaskComponent;
  let fixture: ComponentFixture<ListMaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
