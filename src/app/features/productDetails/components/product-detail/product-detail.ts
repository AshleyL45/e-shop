import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { ProductReviewDialogComponent } from '../../../products/components/product-review-dialog/product-review-dialog';
import { Review } from '../../../products/models/review.model';
import { Product } from '../../../products/models/product.model';
import {Router} from "@angular/router";
import {FavoriteButtonComponent} from "../../../products/components/favorite-button/favorite-button";
import {BackButtonComponent} from "../../../core/components/back-button/back-button";

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [
        CommonModule,
        AccordionModule,
        ButtonModule,
        ProductReviewDialogComponent,
        FavoriteButtonComponent,
        BackButtonComponent,
    ],
    templateUrl: './product-detail.html',
    styleUrls: ['./product-detail.scss'],
})
export class ProductDetailComponent {
    constructor(private router: Router) {}

    productInput = input<Product>(undefined, { alias: 'product' });

    get product(): Product | undefined {
        return this.productInput();
    }

    openReviewDialog = output<void>();

    selectedSize: string | null = null;
    showReviewDialog = false;
    sizes = ['XS', 'S', 'M', 'L', 'XL'];

    get productNameSafe(): string {
        return this.product?.name ?? '';
    }

    selectSize(size: string): void {
        this.selectedSize = size;
    }

    addToCart(): void {
        if (!this.product?.inStock) {
            console.warn('Produit en rupture de stock, ajout impossible.');
            return;
        }
        console.log(`Produit ajouté au panier : ${this.product.name}`);
    }

    onRatingClick(event: MouseEvent): void {
        event.stopPropagation();
        this.openReviewDialog.emit();
    }

    closeReviewDialog(): void {
        this.showReviewDialog = false;
    }

    onReviewSubmitted(review: Review): void {
        if (!this.product) return;

        review.productId = this.product.id;
        console.log('📝 Avis ajouté pour le produit :', review);

        const newRating = this.product.rating
            ? (this.product.rating + review.rating) / 2
            : review.rating;

        this.product.rating = +newRating.toFixed(1);
        this.showReviewDialog = false;
    }


    onToggleFavorite(): void {
        if (this.product) {
            this.product.isFavorite = !this.product.isFavorite;
            console.log(
                `${this.product.name} ${
                    this.product.isFavorite ? 'ajouté' : 'retiré'
                } des favoris`
            );
        }
    }

    goToProducts() {
        this.router.navigateByUrl('/products');
    }

}
