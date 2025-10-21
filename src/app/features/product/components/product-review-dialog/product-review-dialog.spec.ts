import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewDialog } from './product-review-dialog';

describe('ProductReviewDialog', () => {
  let component: ProductReviewDialog;
  let fixture: ComponentFixture<ProductReviewDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductReviewDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductReviewDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
