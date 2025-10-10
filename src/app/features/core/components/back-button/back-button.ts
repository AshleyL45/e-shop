import { Component, inject, signal, effect, input, computed } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../services/layout-service';

@Component({
    selector: 'app-back-button',
    standalone: true,
    templateUrl: './back-button.html',
    styleUrls: ['./back-button.scss']
})

export class BackButtonComponent {
    private router = inject(Router);
    private layout = inject(LayoutService);

    label = input<string>('Retour');
    targetRoute = input<string>('/');

    displayLabel = signal(this.label());

    top = computed(() => (this.layout.showHeader() ? '80px' : '20px'));

    constructor() {
        effect(() => {
            const updateLabel = () => {
                if (window.innerWidth <= 768) {
                    this.displayLabel.set('Retour');
                } else {
                    this.displayLabel.set(this.label());
                }
            };

            updateLabel();

            window.addEventListener('resize', updateLabel);

            return () => window.removeEventListener('resize', updateLabel);
        });
    }

    goBack() {
        this.router.navigate([this.targetRoute()]);
    }
}