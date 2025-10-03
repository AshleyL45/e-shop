import {Component, Input} from '@angular/core';
import {ProductCard} from "../product-card/product-card";
import {CurrencyPipe} from "@angular/common";
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader, MatCardImage,
    MatCardSubtitle,
    MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";


@Component({
  selector: 'app-product-list',
    imports: [CurrencyPipe, MatCardContent, MatCard, MatCardTitle, MatCardImage, MatButton],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {
    @Input() products: any[] = [];

    get totalProducts(): number {
        return this.products.length;
    }

    get productsInStock(): number {
        return this.products.filter(p => p.inStock).length;
    }



}
