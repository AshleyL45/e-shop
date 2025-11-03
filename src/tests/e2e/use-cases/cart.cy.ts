describe('Scénario 1: Ajouter un produit, voir le panier, valider la commande', () => {
    beforeEach(() => {
        cy.intercept('GET', '/products.json', { fixture: 'products.json' }).as('getProducts');
        cy.visit('/products');
        cy.wait('@getProducts');
    });

    it('Ajoute un produit depuis /products, le retrouve dans /cart, et passe la commande', () => {
        cy.contains('.product-card', 'Ficus Lyrata')
            .should('exist')
            .within(() => {
                cy.contains('Ajouter au panier').click();
            });

        cy.contains('🛒 1').should('exist');
        cy.get('a[href="/cart"]').click();
        cy.url().should('include', '/cart');
        cy.contains('Ficus Lyrata', { timeout: 8000 }).should('exist');

        cy.fixture('products.json').then((products) => {
            const ficus = products.find((p: any) => p.name === 'Ficus Lyrata');
            const expectedTotal = Number((ficus.price * 1.2).toFixed(2)); // TTC (TVA 20%)

            cy.get('[data-testid="cart-total"]').invoke('text').then((text) => {
                const displayedTotal = parseFloat(text.replace(',', '.').replace(/[^\d.]/g, ''));
                expect(displayedTotal).to.eq(expectedTotal);
            });
        });

        cy.get('[data-testid="checkout-btn"]').should('not.be.disabled').click();
        cy.get('[data-testid="empty-cart"]', { timeout: 8000 })
            .should('exist')
            .and('be.visible')
            .and('contain', 'Votre panier est vide');

        cy.get('[data-testid="checkout-btn"]').should('be.disabled');
    });
});



describe('Scénario 3: Ajout ➜ Panier ➜ Suppression d’un item ➜ Checkout', () => {
    beforeEach(() => {
        cy.intercept('GET', '/products.json', { fixture: 'products.json' }).as('getProducts');
        cy.visit('/products');
        cy.wait('@getProducts');
    });

    it('Ajoute deux produits, supprime le premier, puis valide la commande', () => {
        cy.contains('.product-card', 'Ficus Lyrata')
            .should('exist')
            .within(() => cy.contains('Ajouter au panier').click());
        cy.contains('🛒 1').should('exist');
        cy.contains('.product-card', 'Monstera Deliciosa')
            .should('exist')
            .within(() => cy.contains('Ajouter au panier').click());
        cy.contains('🛒 2').should('exist');
        cy.get('a[href="/cart"]').click();
        cy.url().should('include', '/cart');
        cy.get('.cart-item', { timeout: 8000 }).should('have.length', 2);
        cy.contains('Ficus Lyrata').should('exist');
        cy.contains('Monstera Deliciosa').should('exist');
        cy.get('[data-testid="delete-btn"]').first().click();
        cy.get('.cart-item', { timeout: 8000 }).should('have.length', 1);
        cy.contains('Ficus Lyrata').should('not.exist');
        cy.contains('Monstera Deliciosa').should('exist');
        cy.get('[data-testid="checkout-btn"]').should('not.be.disabled').click();
        cy.get('[data-testid="empty-cart"]', { timeout: 8000 })
            .should('exist')
            .and('contain', 'Votre panier est vide');
        cy.get('[data-testid="checkout-btn"]').should('be.disabled');
    });
});


describe('Scénario 4 — Ajout ➜ Panier ➜ Clear ➜ Pas de checkout', () => {
    beforeEach(() => {
        cy.intercept('GET', '/products.json', { fixture: 'products.json' }).as('getProducts');
        cy.visit('/products');
        cy.wait('@getProducts');
    });

    it('Ajoute un produit, vide le panier, et bloque le checkout', () => {
        cy.contains('.product-card', 'Ficus Lyrata')
            .should('exist')
            .within(() => cy.contains('Ajouter au panier').click());
        cy.contains('🛒 1').should('exist');
        cy.get('a[href="/cart"]').click();
        cy.url().should('include', '/cart');
        cy.contains('Ficus Lyrata').should('exist');
        cy.get('[data-testid="clear-cart-btn"]').should('not.be.disabled').click();
        cy.get('[data-testid="empty-cart"]', { timeout: 8000 })
            .should('exist')
            .and('contain', 'Votre panier est vide');
        cy.get('[data-testid="checkout-btn"]').click({ force: true });
        cy.contains('Impossible de valider un panier vide', { timeout: 5000 })
            .should('exist');
        cy.get('[data-testid="checkout-btn"]').should('be.disabled');
    });
});
