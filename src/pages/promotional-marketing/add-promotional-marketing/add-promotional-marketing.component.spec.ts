import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPromotionalMarketingComponent } from './add-promotional-marketing.component';

describe('AddPromotionalMarketingComponent', () => {
  let component: AddPromotionalMarketingComponent;
  let fixture: ComponentFixture<AddPromotionalMarketingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPromotionalMarketingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPromotionalMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
