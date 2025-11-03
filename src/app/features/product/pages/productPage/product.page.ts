import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { PageTitle } from '../../../../core/components/titles/page-title/page-title';
import { ProductList } from '../../components/product-list/product-list';
import { Product } from '../../models/product.model';
import { LoadingService } from '../../../../core/services/loadingService';
import { ProductApiService } from '../../services/product-api.service';

@Component({
    selector: 'app-product-page',
    standalone: true,
    imports: [PageTitle, ProductList],
    templateUrl: './product.page.html',
    styleUrls: ['./product.page.scss']
})
export default class ProductPage {
    private router = inject(Router);
    private loading = inject(LoadingService);
    private api = inject(ProductApiService);
    private cdr = inject(ChangeDetectorRef);

    products: Product[] = [];

    cartCount = 0;
    favoriteCount = 0;
    favoriteIds = new Set<number>();

    async ngOnInit() {
        try {
            this.loading.show();
            await new Promise(res => setTimeout(res, 0));
            this.products = await this.api.getProducts();
            this.cdr.detectChanges();
        } catch (err) {
            console.error('Erreur chargement produits :', err);
        } finally {
            this.loading.hide();
        }
    }

    onProductAddedToCart(product: Product) {
        this.cartCount++;
    }

    onProductAddedToFavorites(product: Product) {
        if (!this.favoriteIds.has(product.id)) {
            this.favoriteIds.add(product.id);
            this.favoriteCount = this.favoriteIds.size;
            console.log(`❤️ Ajouté : ${product.name}`);
        }
    }

    onProductRemovedFromFavorites(product: Product) {
        if (this.favoriteIds.delete(product.id)) {
            this.favoriteCount = this.favoriteIds.size;
            console.log(`💔 Retiré : ${product.name}`);
        }
    }

    goToDetail(product: Product) {
        this.router.navigate(['/products', product.id]);
    }
}
