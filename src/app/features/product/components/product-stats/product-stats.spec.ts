import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStats } from './product-stats';

describe('ProductStats', () => {
  let component: ProductStats;
  let fixture: ComponentFixture<ProductStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
