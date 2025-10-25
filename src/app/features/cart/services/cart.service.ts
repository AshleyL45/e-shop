import { Injectable, signal, computed } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';

export type CartItem = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category?: string;
    description?: string;
    quantity: number;
    stock?: number;
};

@Injectable({ providedIn: 'root' })
export class CartService {
    private _items = signal<CartItem[]>([]);
    items = this._items.asReadonly();

    openRequested = signal(false);

    lastAction = signal<{ type: string; item?: CartItem } | null>(null);

    total = computed(() =>
        this._items().reduce((acc, i) => acc + i.price * i.quantity, 0)
    );

    constructor(private notify: NotificationService) {}

    addToCart(item: CartItem): void {
        const items = this._items();
        const existing = items.find((i) => i.id === item.id);

        if (existing) {
            existing.quantity += item.quantity;
            this._items.set([...items]);
            this.lastAction.set({ type: 'update', item });
            this.notify.info(`${item.name} : quantité mise à jour`);
        } else {
            this._items.set([...items, item]);
            this.lastAction.set({ type: 'add', item });
            this.notify.success(`${item.name} ajouté au panier`);
        }

        this.openRequested.set(true);
    }

    updateQuantity(id: number, quantity: number): void {
        const items = this._items().map((i) =>
            i.id === id ? { ...i, quantity } : i
        );
        this._items.set(items); // ✅ crée un nouveau tableau = déclenche le signal
        this.lastAction.set({ type: 'update', item: items.find(i => i.id === id) });
    }



    removeFromCart(id: number): void {
        const removedItem = this._items().find(i => i.id === id);
        this._items.update((items) => items.filter((i) => i.id !== id));
        this.lastAction.set({ type: 'remove', item: removedItem });
        this.notify.warn(`${removedItem?.name ?? 'Produit'} supprimé du panier`);
    }

    clearCart(): void {
        this._items.set([]);
        this.lastAction.set({ type: 'clear' });
        this.notify.warn(`Panier vidé`);
    }

    checkout(): void {
        const items = this._items();

        if (items.length === 0) {
            this.notify.error(`Impossible de valider un panier vide ⚠️`);
            this.lastAction.set({ type: 'checkout-error' });
            return;
        }

        this.clearCart();
        this.lastAction.set({ type: 'checkout' });
        this.notify.success(`Commande validée`);
    }

}
