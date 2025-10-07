import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Button } from 'primeng/button';
import { Product } from '../../models/product.model';
import {FavoriteButtonComponent} from "../favorite-button/favorite-button";

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        Button,
        FavoriteButtonComponent
    ],
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
    product = input.required<Product>();

    productAddedToCart = output<Product>();
    productAddedToFavorites = output<Product>();
    productRemovedFromFavorites = output<Product>();

    addToCart(): void {
        this.productAddedToCart.emit(this.product());
    }

    onToggleFavorite(): void {
        if (this.isFavorite()) {
            this.productRemovedFromFavorites.emit(this.product());
        } else {
            this.productAddedToFavorites.emit(this.product());
        }
    }

    isFavorite(): boolean {
        return this.product().isFavorite ?? false;
    }
}
