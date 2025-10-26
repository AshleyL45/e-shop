import {inject, Injectable} from '@angular/core';
import {OrderApi} from './order-api.service';
import { OrderStore } from './order.store';

@Injectable({ providedIn: 'root' })
export class OrderFacade {
    private readonly api = inject(OrderApi);
    private readonly store = inject(OrderStore);

    readonly orders = this.store.orders;
    readonly loading = this.store.loading;
    readonly error = this.store.error;

    async loadOrders() {
        try {
            this.store.setLoading(true);
            const orders = await this.api.getOrders();
            this.store.setOrders(orders);
        } catch (e) {
            this.store.setError('Impossible de charger les commandes');
        } finally {
            this.store.setLoading(false);
        }
    }
}