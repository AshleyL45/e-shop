import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-order-product-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './order-product-list.html',
    styleUrls: ['./order-product-list.scss']
})
export class OrderProductList {
    readonly items = input.required<any[]>();

    getItemTotal(price: number, qty: number): number {
        return price * qty;
    }
}
