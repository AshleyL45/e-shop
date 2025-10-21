import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

export interface CartItem extends Product {
    quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
    private readonly _items = signal<CartItem[]>([]);
    readonly items = this._items;
    readonly total = computed(() =>
        this._items().reduce((sum, item) => sum + item.price * item.quantity, 0)
    );

    readonly openRequested = signal(false);

    addToCart(product: Product): void {
        const current = this._items();
        const existing = current.find(p => p.id === product.id);

        if (existing) {
            existing.quantity++;
            this._items.set([...current]);
        } else {
            this._items.set([...current, { ...product, quantity: 1 }]);
        }

        this.openRequested.set(true);
    }

    removeFromCart(id: number): void {
        const updated = this._items()
            .map(p => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
            .filter(p => p.quantity > 0);
        this._items.set(updated);
    }

    clearCart(): void {
        this._items.set([]);
    }
}
