import { Injectable } from '@angular/core';
import { BaseApi } from '../../../shared/services/base.api';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderApi extends BaseApi {
    override readonly BASE_URL = '/';

    async getOrders(): Promise<Order[]> {
        return this.get<Order[]>('orders.json');
    }
}
