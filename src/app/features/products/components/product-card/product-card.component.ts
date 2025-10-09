import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Button, ButtonDirective} from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button';
import {Router} from "@angular/router";
import {Review} from "../../models/review.model";
import {ProductReviewDialogComponent} from "../product-review-dialog/product-review-dialog";
import {Card} from "primeng/card";

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [
        CommonModule,
        Button,
        DialogModule,
        RatingModule,
        FormsModule,
        FavoriteButtonComponent,
        ProductReviewDialogComponent,
        Card
    ],
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
    constructor(private router: Router) {}

    product = input.required<Product>();

    productAddedToCart = output<Product>();
    productAddedToFavorites = output<Product>();
    productRemovedFromFavorites = output<Product>();
    reviewSubmitted = output<Review>();

    showDialog = false;


    onDialogClosed(): void {
        this.showDialog = false;
    }

    onReviewSubmitted(review: Review): void {
        review.productId = this.product().id;
        this.reviewSubmitted.emit(review);
        this.showDialog = false;
    }


    addToCart(event?: Event): void {
        event?.stopPropagation();
        console.log(`Produit ajouté au panier : ${this.product().name} (id: ${this.product().id})`);

        this.productAddedToCart.emit(this.product());
    }

    onToggleFavorite(): void {
        if (this.isFavorite()) {
            this.productRemovedFromFavorites.emit(this.product());
            console.log(`Produit ajouté aux favoris : ${this.product().name} (id: ${this.product().id})`);
        } else {
            this.productAddedToFavorites.emit(this.product());
            console.log(`Produit ajouté aux favoris : ${this.product().name} (id: ${this.product().id})`);
        }
    }

    isFavorite(): boolean {
        return this.product().isFavorite ?? false;
    }

    openReviewDialog(event?: Event): void {
        event?.stopPropagation();
        this.showDialog = true;
    }

    goToProductDetails(): void {
        this.router.navigate(['/products', this.product().id]);
    }


}
