import { CommonModule } from '@angular/common';
import {Component, input, ViewEncapsulation} from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import {Product} from "../../../product/models/product.model";

@Component({
    selector: 'app-product-tabs',
    standalone: true,
    imports: [CommonModule, TabsModule],
    templateUrl: './product-tabs.html',
    styleUrl: './product-tabs.scss',
    encapsulation: ViewEncapsulation.None,
    host: { class: 'product-tabs-root' }
})
export class ProductTabs {
    product = input<Product>();}
