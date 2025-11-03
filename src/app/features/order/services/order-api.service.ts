import { Injectable } from '@angular/core';
import { BaseApi } from '../../../shared/services/base.api';
import {Order} from "../../../core/models/order.model";
import {firstValueFrom} from "rxjs";

@Injectable({ providedIn: 'root' })
export class OrderApi extends BaseApi {
    override readonly BASE_URL = '/';

    async getOrders(): Promise<Order[]> {
        return this.get<Order[]>('orders.json');
    }

    async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
        await firstValueFrom(
            this.http.put<void>(`/api/orders/${orderId}/status`, { status })
        );
    }
}
