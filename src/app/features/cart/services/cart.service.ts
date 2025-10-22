import {Injectable, signal, computed, effect} from '@angular/core';
import { Product } from '../../product/models/product.model';

export interface CartItem extends Product {
    quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
    private readonly STORAGE_KEY = 'eshop_cart';

    private readonly _items = signal<CartItem[]>(this.loadFromStorage());

    readonly items = this._items.asReadonly();
    readonly total = computed(() =>
        this._items().reduce((sum, item) => sum + item.price * item.quantity, 0)
    );
    readonly openRequested = signal(false);

    constructor() {
        effect(() => {
            this.saveToStorage(this._items());
        });
    }

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
        localStorage.removeItem(this.STORAGE_KEY);
    }

    checkout(): void {
        this.clearCart(); // on vide tout
    }

    private saveToStorage(items: CartItem[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    }

    private loadFromStorage(): CartItem[] {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    }
}
