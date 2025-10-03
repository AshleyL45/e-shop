import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import {Button} from "primeng/button";

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [MatCardModule, CurrencyPipe, Button],
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
    @Input() product: any;

    addToCart(product: any) {
        console.log("🛒 Produit ajouté au panier :", product);
    }
}
