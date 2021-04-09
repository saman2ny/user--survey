import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateListComponent } from './corporate-list.component';

describe('CorporateListComponent', () => {
  let component: CorporateListComponent;
  let fixture: ComponentFixture<CorporateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
