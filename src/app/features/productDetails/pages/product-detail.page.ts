import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from '../components/product-detail/product-detail';
import { ActivatedRoute } from '@angular/router';
import {ProductReviewDialogComponent} from "../../products/components/product-review-dialog/product-review-dialog";
import {Product} from "../../products/models/product.model";
import {productsMock} from "../../products/mocks/products.mock";
import {Review} from "../../products/models/review.model";

@Component({
    selector: 'app-product-detail-page',
    standalone: true,
    imports: [CommonModule, ProductDetailComponent, ProductReviewDialogComponent],
    template: `
        @if (product) {
            <app-product-detail
                    [product]="product"
                    (openReviewDialog)="openReviewDialog()"
            ></app-product-detail>
        }

        <app-product-review-dialog
                [visible]="showReviewDialog"
                [productName]="productNameSafe"
                (reviewSubmitted)="onReviewSubmitted($event)"
                (closed)="closeReviewDialog()"
        ></app-product-review-dialog>
    `,
})
class ProductDetailPage implements OnInit {
    product?: Product;
    showReviewDialog = false;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.product = productsMock.find(p => p.id === id);
    }

    get productNameSafe(): string {
        return this.product?.name ?? '';
    }

    openReviewDialog(): void {
        this.showReviewDialog = true;
    }

    closeReviewDialog(): void {
        this.showReviewDialog = false;
    }

    onReviewSubmitted(review: Review): void {
        if (!this.product) return;

        review.productId = this.product.id;

        const newRating = this.product.rating
            ? (this.product.rating + review.rating) / 2
            : review.rating;

        this.product.rating = +newRating.toFixed(1);
        this.showReviewDialog = false;
    }
}

export default ProductDetailPage;
export { ProductDetailPage };
