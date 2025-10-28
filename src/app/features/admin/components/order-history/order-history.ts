import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderFacade } from '../../../order/services/order.facade';
import { OrderStatusFilter } from '../order-status-filter/order-status-filter';
import { SearchBar } from '../search-bar/search-bar';
import { OrderDateSorter } from '../order-date-sorter/order-date-sorter';

@Component({
    selector: 'app-order-history',
    standalone: true,
    imports: [CommonModule, OrderStatusFilter, SearchBar, OrderDateSorter],
    templateUrl: './order-history.html',
    styleUrls: ['./order-history.scss']
})
export class OrderHistory implements OnInit {
    private readonly facade = inject(OrderFacade);

    readonly orders = this.facade.orders;
    readonly loading = this.facade.loading;
    expanded = signal<string | null>(null);

    selectedStatus = signal<string | null>(null);
    searchTerm = signal<string>('');

    ngOnInit() {
        this.facade.loadOrders();
    }

    toggle(orderId: string) {
        this.expanded.update(id => id === orderId ? null : orderId);
    }

    onFilter(status: string | null) {
        this.selectedStatus.set(status);
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
        return order.items?.reduce(
            (total: number, item: any) => total + (item.quantity ?? 1),
            0
        ) ?? 0;
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

    filteredOrders(sortDirection: string | null) {
        const status = this.selectedStatus();
        const search = this.searchTerm();
        let filtered = this.orders();

        if (status) {
            filtered = filtered.filter(o => o.status === status);
        }

        if (search) {
            filtered = filtered.filter(o => {
                const id = o.id.replace('#', '').toLowerCase();
                return id.includes(search);
            });
        }

        if (sortDirection === 'asc') {
            filtered = [...filtered].sort(
                (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );
        } else if (sortDirection === 'desc') {
            filtered = [...filtered].sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
        }

        return filtered;
    }

    onSearch(term: string) {
        this.searchTerm.set(term.trim().toLowerCase());
    }
}
