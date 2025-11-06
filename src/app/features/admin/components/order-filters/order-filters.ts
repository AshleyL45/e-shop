import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStatusFilter } from '../order-status-filter/order-status-filter';
import { OrderDateSorter } from '../order-date-sorter/order-date-sorter';
import { SearchBar } from '../search-bar/search-bar';

@Component({
    selector: 'app-order-filters',
    standalone: true,
    imports: [CommonModule, OrderStatusFilter, OrderDateSorter, SearchBar],
    templateUrl: './order-filters.html',
    styleUrls: ['./order-filters.scss']
})
export class OrderFilters {
    readonly filter = output<string | null>();
    readonly search = output<string>();
    readonly sortChange = output<'asc' | 'desc' | null>();

    onFilter(status: string | null) {
        this.filter.emit(status);
    }

    onSearch(term: string) {
        this.search.emit(term);
    }

    onSortChange(direction: 'asc' | 'desc' | null) {
        this.sortChange.emit(direction);
    }

}
