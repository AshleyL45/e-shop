import { Component, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-search-bar',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './search-bar.html',
    styleUrl: './search-bar.scss'
})
export class SearchBar {
    searchTerm = signal('');
    search = output<string>();
    isFocused = signal(false);

    onInputChange(value: string) {
        this.searchTerm.set(value);
    }

    onEnter(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.search.emit(this.searchTerm());
        }
    }

    onFocus(state: boolean) {
        this.isFocused.set(state);
    }
}
