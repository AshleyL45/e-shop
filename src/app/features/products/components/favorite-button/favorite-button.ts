import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-favorite-button',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    templateUrl: 'favorite-button.html',
    styleUrls: ['favorite-button.scss']
})
export class FavoriteButtonComponent {
    @Input() isFavorite = false;
    @Output() toggle = new EventEmitter<void>();

    onToggle(event: Event): void {
        event.stopPropagation();
        this.isFavorite = !this.isFavorite;
        this.toggle.emit();
    }
}
