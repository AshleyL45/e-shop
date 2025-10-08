import { Component, inject } from '@angular/core';
import { ProductDetailComponent } from '../components/product-detail/product-detail';
import { Product } from '../../products/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { productsMock } from '../../products/mocks/products.mock';

@Component({
    selector: 'app-product-detail-page',
    standalone: true,
    imports: [ProductDetailComponent],
    template: `
        <app-product-detail [product]="product"></app-product-detail>
    `
})
export default class ProductDetailPage {
    private route = inject(ActivatedRoute);
    product?: Product;

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.product = productsMock.find(p => p.id === id);
        console.log('Produit trouvé :', this.product);
    }
}
