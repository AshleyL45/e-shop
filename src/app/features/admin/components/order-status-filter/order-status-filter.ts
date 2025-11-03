import { Component, signal, output } from '@angular/core';

@Component({
    selector: 'app-order-status-filter',
    standalone: true,
    templateUrl: './order-status-filter.html',
    styleUrl: './order-status-filter.scss'
})
export class OrderStatusFilter {
    selectedStatus = signal<string | null>(null);
    filter = output<string | null>();

    statusOptions = [
        { label: 'Toutes', value: null },
        { label: 'En attente', value: 'Pending' },
        { label: 'En livraison', value: 'In Delivery' },
        { label: 'Livrée', value: 'Delivered' }
    ];

    onSelect(event: Event) {
        const select = event.target as HTMLSelectElement | null;
        const value = select?.value || '';
        const normalizedValue = value === '' ? null : value;
        this.selectedStatus.set(normalizedValue);
        this.filter.emit(normalizedValue);
    }

    clear() {
        this.selectedStatus.set(null);
        this.filter.emit(null);
    }
}
