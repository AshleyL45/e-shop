import {OrderItem} from "./order-item.model";
import {Address} from "./address.model";
import {Payment} from "./payment.model";

export type Order = {
    id: string;
    date: string;
    total: number;
    status: 'Pending' | 'In Delivery' | 'Delivered';
    items: OrderItem[];
    billing: Address;
    shipping: Address;
    payment: Payment;
};