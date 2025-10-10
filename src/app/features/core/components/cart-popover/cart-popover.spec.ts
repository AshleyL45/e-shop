import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPopover } from './cart-popover';

describe('CartPopover', () => {
  let component: CartPopover;
  let fixture: ComponentFixture<CartPopover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartPopover]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartPopover);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
