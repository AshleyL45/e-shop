import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { ProductReviewDialogComponent } from '../../../products/components/product-review-dialog/product-review-dialog';
import { Review } from '../../../products/models/review.model';
import { Product } from '../../../products/models/product.model';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [
        CommonModule,
        AccordionModule,
        ButtonModule,
        ProductReviewDialogComponent
    ],
    templateUrl: './product-detail.html',
    styleUrls: ['./product-detail.scss']
})


export class ProductDetailComponent {
    get productNameSafe(): string {
        return this.product()?.name ?? '';
    }


    product = input<Product>();

    sizes = ['XS', 'S', 'M', 'L', 'XL'];
    selectedSize = signal<string | null>(null);

    showReviewDialog = signal(false);

    selectSize(size: string) {
        this.selectedSize.set(size);
    }

    addToCart(): void {
        const currentProduct = this.product();
        if (!currentProduct?.inStock) {
            console.warn('Produit en rupture de stock, ajout impossible.');
            return;
        }

        console.log(`Produit ajouté au panier : ${currentProduct.name}`);
        // → ici tu pourras appeler ton service panier ou émettre un output
    }

    openReviewDialog(event: MouseEvent) {
        event.stopPropagation();
        this.showReviewDialog.set(true);
    }

    closeReviewDialog() {
        this.showReviewDialog.set(false);
    }

    onReviewSubmitted(review: Review) {
        review.productId = this.product()?.id ?? 0;
        this.showReviewDialog.set(false);
    }
}
