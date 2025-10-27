import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LayoutService {
    private router = inject(Router);

    currentUrl = signal(this.router.url);

    constructor() {
        this.router.events.subscribe(() => {
            this.currentUrl.set(this.router.url);
        });
    }

    hideLayout = computed(() =>
        this.currentUrl().startsWith('/error') ||
        this.currentUrl().startsWith('/auth/login') ||
        this.currentUrl().startsWith('/auth/register')
    );

    showHeader = computed(() => !this.hideLayout());
    showFooter = computed(() => !this.hideLayout());
    showNavbar = computed(() => !this.hideLayout());
}
