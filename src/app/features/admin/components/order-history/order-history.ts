import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderFacade } from '../../../order/services/order.facade';
import { ChangeStatusModal } from '../change-status-modal/change-status-modal';
import { OrderFilters } from '../order-filters/order-filters';
import { OrderItem } from '../order-item/order-item';
import { Order } from '../../../../core/models/order.model';

@Component({
    selector: 'app-order-history',
    standalone: true,
    imports: [CommonModule, OrderFilters, OrderItem, ChangeStatusModal],
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
    sortDirection: 'asc' | 'desc' | null = null;

    isModalOpen = signal(false);
    selectedOrder = signal<Order | null>(null);

    ngOnInit(): void {
        this.facade.loadOrders();
    }

    toggle(orderId: string): void {
        this.expanded.update(id => (id === orderId ? null : orderId));
    }

    onFilter(status: string | null): void {
        this.selectedStatus.set(status);
    }

    onSearch(term: string): void {
        this.searchTerm.set(term.trim().toLowerCase());
    }

    filteredOrders(sortDirection: string | null): Order[] {
        let filtered = this.orders();

        const status = this.selectedStatus();
        const search = this.searchTerm();

        if (status) filtered = filtered.filter(o => o.status === status);
        if (search)
            filtered = filtered.filter(o =>
                o.shipping.name.toLowerCase().includes(search)
            );

        if (sortDirection === 'asc')
            filtered = [...filtered].sort((a, b) => +new Date(a.date) - +new Date(b.date));
        else if (sortDirection === 'desc')
            filtered = [...filtered].sort((a, b) => +new Date(b.date) - +new Date(a.date));

        return filtered;
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
