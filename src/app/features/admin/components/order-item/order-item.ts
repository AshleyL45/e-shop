import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../../core/models/order.model';
import { OrderProductList } from '../order-product-list/order-product-list';
import { OrderPayment } from '../order-payment/order-payment';
import {OrderAddress} from "../order-address/order-address";

@Component({
    selector: 'app-order-item',
    standalone: true,
    imports: [CommonModule, OrderAddress, OrderProductList, OrderPayment],
    templateUrl: './order-item.html',
    styleUrls: ['./order-item.scss']
})
export class OrderItem {
    readonly order = input.required<Order>();
    readonly expanded = input<boolean>();
    readonly toggle = output<void>();
    readonly changeStatus = output<Order>();

    getStatusClass(status: Order['status']): string {
        return {
            Delivered: 'status delivered',
            'In Delivery': 'status delivery',
            Pending: 'status pending'
        }[status];
    }

    getStatusLabel(status: Order['status']): string {
        const labels: Record<Order['status'], string> = {
            'Pending': 'En attente',
            'In Delivery': 'En livraison',
            'Delivered': 'Livrée'
        };
        return labels[status] ?? status;
    }

    onToggle() {
        this.toggle.emit();
    }

    onChangeStatus() {
        this.changeStatus.emit(this.order());
    }

    getTotalQuantity(order: Order): number {
        return order.items?.reduce((t, i) => t + (i.quantity ?? 1), 0) ?? 0;
    }
}
