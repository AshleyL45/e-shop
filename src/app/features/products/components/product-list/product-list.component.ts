import { Component, input } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Paginator } from 'primeng/paginator';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [ProductCardComponent, Paginator],
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
    products = input<Product[]>([]);

    first = 0;
    rows = 10;

    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
        console.log('Page changée =>', event);
    }
}
