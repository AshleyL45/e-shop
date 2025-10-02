import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
    @Input() title!: string;
    @Input() price!: number;
    @Input() stock: number = 0;
    @Input() category: string = "other";


    discount = 0.1;

    onBuyClick() {
        if (this.stock) {
            console.log(`${this.title} added to cart`);
        }
    }

    getDiscountPrice(): number {
        return this.price * (1 - this.discount);
    }

}
