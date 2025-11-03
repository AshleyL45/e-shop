import {CartItem} from "@app/features/cart/services/cart.service";
import {CartRules} from "@app/features/cart/services/cart.rules";

describe('CartRules (unit tests)', () => {
    let product: Partial<CartItem>;
    let items: CartItem[];

    beforeEach(() => {
        product = {
            id: 1,
            name: 'Casque audio',
            price: 100,
            quantity: 1,
            stock: 5,
            imageUrl: 'test.jpg',
        };

        items = [
            { id: 1, name: 'Casque audio', price: 100, quantity: 1, stock: 5, imageUrl: 'test.jpg' },
            { id: 2, name: 'Souris', price: 50, quantity: 2, stock: 10, imageUrl: 'test.jpg' }
        ];
    });


    // validateAdd
    describe('validateAdd', () => {
        it('should allow adding a valid product', () => {
            expect(() => CartRules.validateAdd(product, 0)).not.toThrow();
        });

        it('should throw if product has no id', () => {
            const invalid = { ...product, id: undefined };
            expect(() => CartRules.validateAdd(invalid, 0)).toThrowError('Le produit doit avoir un identifiant.');
        });

        it('should throw if quantity is zero', () => {
            const invalid = { ...product, quantity: 0 };
            expect(() => CartRules.validateAdd(invalid, 0)).toThrowError('Quantité invalide.');
        });

        it('should throw if quantity is negative', () => {
            const invalid = { ...product, quantity: -2 };
            expect(() => CartRules.validateAdd(invalid, 0)).toThrowError('Quantité invalide.');
        });

        it('should throw if quantity exceeds stock', () => {
            const invalid = { ...product, quantity: 10 };
            expect(() => CartRules.validateAdd(invalid, 0)).toThrowError('Quantité supérieure au stock disponible.');
        });

        it('should throw if price is negative', () => {
            const invalid = { ...product, price: -10 };
            expect(() => CartRules.validateAdd(invalid, 0)).toThrowError('Prix du produit invalide.');
        });

        it('should throw if cart total exceeds 5000€', () => {
            const invalid = { ...product, price: 3000, quantity: 2 };
            expect(() => CartRules.validateAdd(invalid, 0)).toThrowError(
                'Montant total du panier dépassé (limite 5000€).'
            );
        });
    });


    // validateRemove
    describe('validateRemove', () => {
        it('should not throw if product exists', () => {
            expect(() => CartRules.validateRemove(1, items)).not.toThrow();
        });

        it('should throw if product does not exist', () => {
            expect(() => CartRules.validateRemove(999, items)).toThrowError('Produit introuvable dans le panier.');
        });
    });

    // validateUpdate
    describe('validateUpdate', () => {
        it('should not throw if quantity is valid', () => {
            expect(() => CartRules.validateUpdate(1, 3, 5, items)).not.toThrow();
        });

        it('should throw if product does not exist', () => {
            expect(() => CartRules.validateUpdate(999, 1, 5, items)).toThrowError('Produit inexistant.');
        });

        it('should throw if quantity <= 0', () => {
            expect(() => CartRules.validateUpdate(1, 0, 5, items)).toThrowError('Quantité invalide.');
        });

        it('should throw if quantity exceeds stock', () => {
            expect(() => CartRules.validateUpdate(1, 10, 5, items)).toThrowError('Quantité supérieure au stock disponible.');
        });
    });

    // validateClear
    describe('validateClear', () => {
        it('should never throw', () => {
            expect(() => CartRules.validateClear()).not.toThrow();
        });
    });

    // validateCheckout
    describe('validateCheckout', () => {
        it('should throw if cart is empty', () => {
            expect(() => CartRules.validateCheckout([])).toThrowError('Impossible de valider un panier vide.');
        });

        it('should throw if product in cart is invalid', () => {
            const invalid = [{ id: 1, name: 'Produit', price: -10, quantity: 1, stock: 5, imageUrl: 'test.jpg' }];
            expect(() => CartRules.validateCheckout(invalid)).toThrowError('Produit invalide dans le panier.');
        });

        it('should throw if total exceeds 5000€', () => {
            const tooExpensive = [{ id: 1, name: 'PC Gamer', price: 6000, quantity: 1, stock: 2, imageUrl: 'test.jpg' }];
            expect(() => CartRules.validateCheckout(tooExpensive)).toThrowError(
                'Montant total du panier dépassé (limite 5000€).'
            );
        });

        it('should not throw if cart is valid', () => {
            expect(() => CartRules.validateCheckout(items)).not.toThrow();
        });
    });
});
