import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { PaginatorModule } from 'primeng/paginator';
import { Product } from '../../models/product.model';
import { Review } from '../../models/review.model';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule, ProductCardComponent, PaginatorModule],
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
    products = input<Product[]>([]);
    reviews: Review[] = [];

    first = 0;
    rows = 10;

    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }

    onReviewAdded(review: { productId: number; rating: number; comment: string }) {
        const newReview: Review = { ...review, date: new Date() };
        this.reviews.push(newReview);
        console.log('Nouvel avis ajouté :', newReview);
    }

    getAverageRating(productId: number): number {
        const productReviews = this.reviews.filter(r => r.productId === productId);
        if (productReviews.length === 0) return 0;
        const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
        return +(sum / productReviews.length).toFixed(1);
    }

    getProductWithRating(p: Product): Product {
        return { ...p, rating: this.getAverageRating(p.id) };
    }

}
