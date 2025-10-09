import { Component, input, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { PaginatorModule } from 'primeng/paginator';
import { Product } from '../../models/product.model';
import { Review } from '../../models/review.model';
import {FilterComponent} from "../filter/filter";


@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule, ProductCardComponent, PaginatorModule, FilterComponent, FilterComponent],
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
    products = input<Product[]>([]);

    activeFilter = signal<string | null>(null);

    filteredProducts = computed(() => {
        const category = this.activeFilter();
        const allProducts = this.products();

        if (!category) return allProducts;
        return allProducts.filter(p => p.category === category);
    });

    constructor() {
        effect(() => {
            console.log('🪴 Filtre actif =', this.activeFilter());
            console.log('Produits visibles =', this.filteredProducts().length);
        });
    }

    onFilterChange(category: string | null): void {
        console.log('Catégorie reçue depuis FilterComponent :', category);
        this.activeFilter.set(category);
    }

    reviews: Review[] = [];
    first = 0;
    rows = 10;

    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }

    onReviewAdded(review: Review): void {
        this.reviews.push(review);
    }

    getAverageRating(productId: number): number | null {
        const productReviews = this.reviews.filter(r => r.productId === productId);
        if (productReviews.length === 0) return null;
        const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
        return +(sum / productReviews.length).toFixed(1);
    }

    getProductWithRating(p: Product): Product {
        const average = this.getAverageRating(p.id);
        const finalRating = average === null ? p.rating : average;
        return {...p, rating: finalRating};
    }
}
