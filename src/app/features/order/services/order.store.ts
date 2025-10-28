import { Injectable, signal } from '@angular/core';
import {Order} from "../../../core/models/order.model";

@Injectable({ providedIn: 'root' })
export class OrderStore {
    readonly orders = signal<Order[]>([]);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);

    setOrders(orders: Order[]) {
        this.orders.set(orders);
    }

    setLoading(value: boolean) {
        this.loading.set(value);
    }

    setError(message: string | null) {
        this.error.set(message);
    }
}