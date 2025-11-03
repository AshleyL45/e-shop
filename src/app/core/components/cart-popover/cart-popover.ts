import {
    Component,
    ViewChild,
    ElementRef,
    inject,
    effect,
    ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PopoverModule, Popover } from 'primeng/popover';
import { RippleModule } from 'primeng/ripple';
import { Router } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart.service';

@Component({
    selector: 'app-cart-popover',
    standalone: true,
    imports: [CommonModule, ButtonModule, PopoverModule, RippleModule],
    templateUrl: 'cart-popover.html',
    styleUrls: ['cart-popover.scss'],
})
export class CartPopover {
    @ViewChild('cartPopover') cartPopover!: Popover;
    @ViewChild('cartButton', { static: true }) cartButton!: ElementRef<HTMLButtonElement>;

    private cartService = inject(CartService);
    private cdr = inject(ChangeDetectorRef);
    private router = inject(Router);

    items = this.cartService.items;
    total = this.cartService.total;

    constructor() {
        effect(() => {
            const shouldOpen = this.cartService.openRequested();
            if (shouldOpen) {
                this.openTemporarily();
            }
        });
    }

    toggle(event: Event) {
        this.cartPopover.toggle(event);
    }

    hide() {
        this.cartPopover.hide();
    }

    remove(id: number) {
        this.cartService.removeFromCart(id);
    }

    goToCart() {
        this.hide();
        this.router.navigateByUrl('/cart');
    }

    private openTemporarily(): void {
        setTimeout(() => {
            if (!this.cartButton?.nativeElement || !this.cartPopover) {
                console.warn('⚠️ Popover non prêt');
                return;
            }

            const clickEvent = new MouseEvent('click', { bubbles: true });
            this.cartButton.nativeElement.dispatchEvent(clickEvent);

            console.log('✅ Popover ouvert automatiquement');

            setTimeout(() => {
                this.cartPopover.hide();
                this.cartService.openRequested.set(false);
            }, 3000);
        }, 100);
    }
}
