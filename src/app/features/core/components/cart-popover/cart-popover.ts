import {
    Component,
    ViewChild,
    inject,
    effect,
    ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PopoverModule, Popover } from 'primeng/popover';
import { RippleModule } from 'primeng/ripple';
import { CartService } from '../../../cart/services/cart.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-cart-popover',
    standalone: true,
    imports: [CommonModule, ButtonModule, PopoverModule, RippleModule],
    templateUrl: './cart-popover.html',
    styleUrls: ['./cart-popover.scss']
})
export class CartPopoverComponent {
    @ViewChild('cartPopover') cartPopover!: Popover;

    private cartService = inject(CartService);
    private cdr = inject(ChangeDetectorRef);
    private router = inject(Router);

    items = this.cartService.items;
    total = this.cartService.total;

    constructor() {
        effect(() => {
            const shouldOpen = this.cartService.openRequested();
            if (shouldOpen) {
                console.log('🔔 Signal reçu → ouverture automatique du popover');

                setTimeout(() => {
                    this.cdr.detectChanges();

                    const fakeEvent = new MouseEvent('click');
                    if (this.cartPopover) {
                        this.cartPopover.show(fakeEvent);
                        console.log('✅ Popover ouvert automatiquement');
                    } else {
                        console.warn('⚠️ Popover pas encore monté, tentative ignorée');
                    }

                    this.cartService.openRequested.set(false);
                }, 250);
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
        this.hide(); // ferme le popover avant de naviguer
        this.router.navigateByUrl('/cart');
    }
}
