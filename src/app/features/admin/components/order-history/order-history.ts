import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderFacade } from '../../../order/services/order.facade';

@Component({
    selector: 'app-order-history',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './order-history.html',
    styleUrls: ['./order-history.scss']
})
export class OrderHistory implements OnInit {
    private readonly facade = inject(OrderFacade);

    readonly orders = this.facade.orders;
    readonly loading = this.facade.loading;
    expanded = signal<string | null>(null);

    ngOnInit() {
        this.facade.loadOrders();
    }

    toggle(orderId: string) {
        this.expanded.update(id => id === orderId ? null : orderId);
    }

    getStatusClass(status: 'Pending' | 'In Delivery' | 'Delivered') {
        return {
            Delivered: 'status delivered',
            'In Delivery': 'status delivery',
            Pending: 'status pending'
        }[status];
    }

    getItemTotal(price: number, quantity: number): number {
        return price * quantity;
    }

    getTotalQuantity(order: any): number {
        return order.items?.reduce((total: number, item: any) => total + (item.quantity ?? 1), 0) ?? 0;
    }

    getCalculatedTotal(order: any): number {
        const subtotal = order.items?.reduce(
            (sum: number, item: any) => sum + (item.price * (item.quantity ?? 1)),
            0
        ) ?? 0;
        const shipping = order.payment?.shipping ?? 0;
        const tax = order.payment?.tax ?? 0;
        return subtotal + shipping + tax;
    }
}
