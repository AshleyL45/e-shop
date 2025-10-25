// src/tests/e2e/support/commands.ts
/// <reference types="cypress" />

// --- Déclaration globale pour éviter TS2345 / TS2339 ---
declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Ajoute un produit au panier à partir de son nom visible dans la liste produits
             * @param productName Nom exact du produit (ex: "Ficus Lyrata")
             */
            addToCart(productName: string): Chainable<void>;
        }
    }
}

Cypress.Commands.add('addToCart', (productName: string) => {
    // Arrange : on cherche la carte produit contenant le nom
    cy.contains('.product-card', productName)
        .should('exist')
        .within(() => {
            // Act : clic sur le bouton Ajouter au panier
            cy.contains('button', /ajouter au panier/i).click();
        });
});

export {};
