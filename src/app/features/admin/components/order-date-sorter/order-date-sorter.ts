import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-order-date-sorter',
    standalone: true,
    templateUrl: './order-date-sorter.html',
    styleUrl: './order-date-sorter.scss',
})
export class OrderDateSorter {
    readonly sortOptions = [
        { value: 'desc', label: 'Plus récentes' },
        { value: 'asc', label: 'Plus anciennes' },
    ];

    selectedSort = signal<string | null>(null);

    onSelect(event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        this.selectedSort.set(value || null);
    }

    clear() {
        this.selectedSort.set(null);
    }
}
