import { Component, Input } from '@angular/core';
import {ProductCardComponent} from "../product-card/product-card.component";
import {Paginator} from "primeng/paginator";

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [ProductCardComponent, Paginator],
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
    @Input() products: any[] = [];

    first: number = 0;

    rows: number = 10;

    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
        console.log('Page changée =>', event);
    }
}
