import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageMasterComponent } from './language-master.component';

describe('LanguageMasterComponent', () => {
  let component: LanguageMasterComponent;
  let fixture: ComponentFixture<LanguageMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
