import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-filter',
    standalone: true,
    imports: [CommonModule, FormsModule, SelectButtonModule, ButtonModule],
    templateUrl: './filter.html',
    styleUrls: ['./filter.scss']
})
export class FilterComponent {
    categorySelected = output<string | null>();
    activeCategory = signal<string | null>(null);

    activeCategoryModel: string | null = null;
    categories = [
        { label: 'Indoor', value: 'indoor' },
        { label: 'Outdoor', value: 'outdoor' }
    ];

    onSelect(event: any) {
        const selected = event.value?.value ?? null;
        this.activeCategory.set(selected);
        this.categorySelected.emit(selected);
    }

    reset(): void {
        this.activeCategory.set(null);
        this.activeCategoryModel = null;
        this.categorySelected.emit(null);
    }
}
