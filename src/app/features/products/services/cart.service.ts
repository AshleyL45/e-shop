import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
    private readonly _items = signal<Product[]>([]);
    readonly items = this._items;

    // ✅ total = somme prix × quantité
    readonly total = computed(() =>
        this._items().reduce((sum, p) => sum + p.price * (p.quantity ?? 1), 0)
    );

    readonly openRequested = signal(false);

    addToCart(product: Product): void {
        const items = this._items();
        const existing = items.find(p => p.id === product.id);

        if (existing) {
            // ✅ Si le produit existe, on incrémente la quantité
            const updated = items.map(p =>
                p.id === product.id ? { ...p, quantity: (p.quantity ?? 1) + 1 } : p
            );
            this._items.set(updated);
        } else {
            // ✅ Sinon, on ajoute avec une quantité initiale
            this._items.set([...items, { ...product, quantity: 1 }]);
        }

        // ouverture automatique du popover
        this.openRequested.set(true);
    }

    removeFromCart(productId: number): void {
        this._items.set(this._items().filter(p => p.id !== productId));
    }

    updateQuantity(productId: number, newQty: number): void {
        const updated = this._items().map(p =>
            p.id === productId ? { ...p, quantity: newQty } : p
        );
        this._items.set(updated);
    }

    clearCart(): void {
        this._items.set([]);
    }
}
