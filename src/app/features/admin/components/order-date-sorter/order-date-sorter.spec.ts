import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDateSorter } from './order-date-sorter';

describe('OrderDateSorter', () => {
  let component: OrderDateSorter;
  let fixture: ComponentFixture<OrderDateSorter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDateSorter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDateSorter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
