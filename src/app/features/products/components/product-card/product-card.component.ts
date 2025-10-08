import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {Button, ButtonDirective} from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button';

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        Button,
        DialogModule,
        RatingModule,
        FormsModule,
        FavoriteButtonComponent,
        ButtonDirective
    ],
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
    product = input.required<Product>();

    productAddedToCart = output<Product>();
    productAddedToFavorites = output<Product>();
    productRemovedFromFavorites = output<Product>();
    reviewSubmitted = output<{ productId: number; rating: number; comment: string }>();

    showDialog = false;

    rating = 0;
    comment = '';

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

    openReviewDialog(): void {
        this.showDialog = true;
    }

    submitReview(): void {
        if (this.rating > 0 && this.comment.trim().length > 0) {
            this.reviewSubmitted.emit({
                productId: this.product().id,
                rating: this.rating,
                comment: this.comment
            });

            // reset form
            this.rating = 0;
            this.comment = '';
            this.showDialog = false;
        }
    }
}
