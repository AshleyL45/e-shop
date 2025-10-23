import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { ProductReviewDialog } from '../../../product/components/product-review-dialog/product-review-dialog';
import { Review } from '../../../product/models/review.model';
import { Product } from '../../../product/models/product.model';
import { Router } from '@angular/router';
import { FavoriteButton } from '../../../product/components/favorite-button/favorite-button';
import { BackButton } from '../../../core/components/back-button/back-button';
import { CartService } from '../../../cart/services/cart.service';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [
        CommonModule,
        AccordionModule,
        ButtonModule,
        ProductReviewDialog,
        FavoriteButton,
        BackButton,
    ],
    templateUrl: './product-detail.html',
    styleUrls: ['./product-detail.scss'],
})
export class ProductDetail {
    constructor(
        private router: Router,
        private cartService: CartService
    ) {}

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
        if (!this.product) return;

        if (!this.product.inStock) {
            console.warn('Produit en rupture de stock, ajout impossible.');
            return;
        }

        this.cartService.addToCart({ ...this.product, quantity: 1 });
        console.log(`🛒 Produit ajouté au panier : ${this.product.name}`);
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
