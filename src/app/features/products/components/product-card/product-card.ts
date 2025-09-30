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
    @Input() inStock: boolean = true;

    onBuyClick() {
        if (this.inStock) {
            console.log(`${this.title} added to cart`);
        }
    }

}
