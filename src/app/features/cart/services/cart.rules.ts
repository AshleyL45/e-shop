import { CartItem } from './cart.service';

export class CartRules {
    private static readonly LIMIT = 5000;

    static validateAdd(item: Partial<CartItem>, currentTotal: number): void {
        if (!item.id) throw new Error('Le produit doit avoir un identifiant.');
        if ((item.quantity ?? 1) <= 0) throw new Error('Quantité invalide.');
        if (item.stock && (item.quantity ?? 1) > item.stock)
            throw new Error('Quantité supérieure au stock disponible.');
        if ((item.price ?? 0) < 0)
            throw new Error('Prix du produit invalide.');
        if (currentTotal + (item.price ?? 0) * (item.quantity ?? 1) > this.LIMIT)
            throw new Error('Montant total du panier dépassé (limite 5000€).');
    }

    static validateRemove(id: number, items: CartItem[]): void {
        if (!items.find(i => i.id === id))
            throw new Error('Produit introuvable dans le panier.');
    }

    static validateUpdate(
        id: number,
        quantity: number,
        stock: number | undefined,
        items: CartItem[]
    ): void {
        const item = items.find(i => i.id === id);
        if (!item) throw new Error('Produit inexistant.');
        if (quantity <= 0) throw new Error('Quantité invalide.');
        if (stock && quantity > stock)
            throw new Error('Quantité supérieure au stock disponible.');
    }

    static validateClear(): void {
    }

    static validateCheckout(items: CartItem[]): void {
        if (items.length === 0)
            throw new Error('Impossible de valider un panier vide.');
        if (items.some(i => !i.id || i.price < 0))
            throw new Error('Produit invalide dans le panier.');
        const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
        if (total > this.LIMIT)
            throw new Error('Montant total du panier dépassé (limite 5000€).');
    }
}
