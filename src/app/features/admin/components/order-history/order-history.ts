import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderFacade } from '../../../order/services/order.facade';
import { OrderStatusFilter } from '../order-status-filter/order-status-filter';
import { SearchBar } from '../search-bar/search-bar';
import { OrderDateSorter } from '../order-date-sorter/order-date-sorter';
import { ChangeStatusModal } from '../change-status-modal/change-status-modal';
import { Order } from '../../../../core/models/order.model';

@Component({
    selector: 'app-order-history',
    standalone: true,
    imports: [
        CommonModule,
        OrderStatusFilter,
        SearchBar,
        OrderDateSorter,
        ChangeStatusModal
    ],
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

    isModalOpen = signal(false);
    selectedOrder = signal<Order | null>(null);

    statusLabels: Record<Order['status'], string> = {
        'Pending': 'En attente',
        'In Delivery': 'En livraison',
        'Delivered': 'Livrée'
    };

    ngOnInit(): void {
        this.facade.loadOrders();
    }

    getStatusLabel(status: Order['status']): string {
        return this.statusLabels[status] ?? status;
    }

    toggle(orderId: string): void {
        this.expanded.update(id => (id === orderId ? null : orderId));
    }

    onFilter(status: string | null): void {
        this.selectedStatus.set(status);
    }

    getStatusClass(status: 'Pending' | 'In Delivery' | 'Delivered'): string {
        return {
            Delivered: 'status delivered',
            'In Delivery': 'status delivery',
            Pending: 'status pending'
        }[status];
    }

    getItemTotal(price: number, quantity: number): number {
        return price * quantity;
    }

    getTotalQuantity(order: Order): number {
        return (
            order.items?.reduce(
                (total: number, item: any) => total + (item.quantity ?? 1),
                0
            ) ?? 0
        );
    }

    getCalculatedTotal(order: Order): number {
        const subtotal =
            order.items?.reduce(
                (sum: number, item: any) => sum + item.price * (item.quantity ?? 1),
                0
            ) ?? 0;
        const shipping = order.payment?.shipping ?? 0;
        const tax = order.payment?.tax ?? 0;
        return subtotal + shipping + tax;
    }

    filteredOrders(sortDirection: string | null): Order[] {
        const status = this.selectedStatus();
        const search = this.searchTerm().trim().toLowerCase();
        let filtered = this.orders();

        if (status) {
            filtered = filtered.filter(o => o.status === status);
        }

        if (search) {
            filtered = filtered.filter(o => {
                const id = o.id.replace('#', '').toLowerCase();
                const shippingName = o.shipping?.name?.toLowerCase() || '';
                const billingName = o.billing?.name?.toLowerCase() || '';
                return (
                    id.includes(search) ||
                    shippingName.includes(search) ||
                    billingName.includes(search)
                );
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

    onSearch(term: string): void {
        this.searchTerm.set(term.trim().toLowerCase());
    }

    openStatusModal(order: Order): void {
        this.selectedOrder.set(order);
        this.isModalOpen.set(true);
    }

    closeModal(): void {
        this.isModalOpen.set(false);
        this.selectedOrder.set(null);
    }

    updateOrderStatus(newStatus: Order['status']): void {
        const order = this.selectedOrder();
        if (order) {
            this.facade.updateOrderStatus(order.id, newStatus);
            this.closeModal();
        }
    }
}
