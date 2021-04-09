import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPromotionalMarketingComponent } from './list-promotional-marketing.component';

describe('ListPromotionalMarketingComponent', () => {
  let component: ListPromotionalMarketingComponent;
  let fixture: ComponentFixture<ListPromotionalMarketingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPromotionalMarketingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPromotionalMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
