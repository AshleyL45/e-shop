import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order } from '../../../../core/models/order.model';

@Component({
    selector: 'app-change-status-modal',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './change-status-modal.html',
    styleUrls: ['./change-status-modal.scss']
})
export class ChangeStatusModal {
    @Input() order!: Order;
    @Input() isOpen = false;
    @Output() close = new EventEmitter<void>();
    @Output() saveStatus = new EventEmitter<Order['status']>();

    selectedStatus!: Order['status'];

    statusLabels: Record<Order['status'], string> = {
        'Pending': 'En attente',
        'In Delivery': 'En livraison',
        'Delivered': 'Livrée'
    };

    statusOptions = [
        { label: 'En attente', value: 'Pending' },
        { label: 'En livraison', value: 'In Delivery' },
        { label: 'Livrée', value: 'Delivered' }
    ];

    ngOnChanges() {
        if (this.order) this.selectedStatus = this.order.status;
    }

    getStatusLabel(status: Order['status']): string {
        return this.statusLabels[status] ?? status;
    }

    onSave() {
        this.saveStatus.emit(this.selectedStatus);
    }

    onCancel() {
        this.close.emit();
    }

    getStatusClass(status: Order['status']): string {
        return {
            Delivered: 'status delivered',
            'In Delivery': 'status delivery',
            Pending: 'status pending'
        }[status];
    }

}
