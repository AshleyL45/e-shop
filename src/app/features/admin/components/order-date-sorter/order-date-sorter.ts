import { Component, signal, output } from '@angular/core';

@Component({
    selector: 'app-order-date-sorter',
    standalone: true,
    templateUrl: './order-date-sorter.html',
    styleUrls: ['./order-date-sorter.scss']
})
export class OrderDateSorter {
    readonly sortOptions = [
        { value: 'desc', label: 'Plus récentes' },
        { value: 'asc', label: 'Plus anciennes' },
    ];

    selectedSort = signal<'asc' | 'desc' | null>(null);
    readonly sort = output<'asc' | 'desc' | null>();

    onSelect(event: Event): void {
        const value = (event.target as HTMLSelectElement).value as 'asc' | 'desc' | '';
        const selected = value === '' ? null : value;
        this.selectedSort.set(selected);
        this.sort.emit(selected);
    }

    clear(): void {
        this.selectedSort.set(null);
        this.sort.emit(null);
    }

    selectedSortValue(): 'asc' | 'desc' | null {
        return this.selectedSort();
    }
}
