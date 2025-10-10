import {
    Component,
    ViewChild,
    ElementRef,
    inject,
    effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PopoverModule, Popover } from 'primeng/popover';
import { RippleModule } from 'primeng/ripple';
import { CartService } from '../../../products/services/cart.service';

@Component({
    selector: 'app-cart-popover',
    standalone: true,
    imports: [CommonModule, ButtonModule, PopoverModule, RippleModule],
    templateUrl: './cart-popover.html',
    styleUrls: ['./cart-popover.scss']
})
export class CartPopoverComponent {
    @ViewChild('cartPopover') cartPopover!: Popover;
    @ViewChild('cartButton', { read: ElementRef }) cartButton!: ElementRef<HTMLButtonElement>;

    private cartService = inject(CartService);

    items = this.cartService.items;
    total = this.cartService.total;

    private autoCloseTimeout: any = null;

    constructor() {
        effect(() => {
            const shouldOpen = this.cartService.openRequested();
            if (shouldOpen) {
                console.log('🟢 Signal reçu → ouverture demandée');

                setTimeout(() => {
                    const btn = this.cartButton?.nativeElement;
                    if (btn) {
                        console.log('✅ Click simulé sur le bouton réel');
                        btn.click(); // ouvre le popover comme un clic utilisateur
                        this.scheduleAutoClose(); // 👈 planifie la fermeture
                    }
                    this.cartService.openRequested.set(false);
                }, 150);
            }
        });
    }

    /** Ouvre/ferme manuellement */
    toggle(event: Event) {
        this.cartPopover.toggle(event);
    }

    /** Ferme manuellement */
    hide() {
        this.cartPopover.hide();
        if (this.autoCloseTimeout) {
            clearTimeout(this.autoCloseTimeout);
            this.autoCloseTimeout = null;
        }
    }

    /** Planifie la fermeture automatique après 5s */
    private scheduleAutoClose() {
        if (this.autoCloseTimeout) {
            clearTimeout(this.autoCloseTimeout);
        }

        this.autoCloseTimeout = setTimeout(() => {
            if (this.cartPopover) {
                console.log('⏳ Fermeture automatique du popover');
                this.cartPopover.hide();
            }
            this.autoCloseTimeout = null;
        }, 5000); // 5000 ms = 5 secondes
    }

    /** Supprime un produit du panier */
    remove(id: number) {
        this.cartService.removeFromCart(id);
    }
}
