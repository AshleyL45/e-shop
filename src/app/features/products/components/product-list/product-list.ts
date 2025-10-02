import { Component } from '@angular/core';
import {ProductCard} from "../product-card/product-card";
import {CurrencyPipe} from "@angular/common";
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader, MatCardImage,
    MatCardSubtitle,
    MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";


@Component({
  selector: 'app-product-list',
    imports: [ProductCard, CurrencyPipe, MatCardActions, MatCardContent, MatCardHeader, MatCard, MatCardTitle, MatCardSubtitle, MatCardImage, MatButton],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {
    products = [
        {
            id: 1,
            name: 'The Witcher 3: Wild Hunt',
            description: 'Jeu de rôle en monde ouvert dans un univers fantasy sombre',
            price: 39.99,
            imageUrl: 'https://placehold.co/300x200/8B0000/ffffff?text=Witcher',
            category: 'gaming',
            inStock: true,
            rating: 4.9
        },
        {
            id: 2,
            name: 'Nike Air Max 270',
            description: 'Baskets de running avec technologie Air Max visible',
            price: 149.99,
            imageUrl: 'https://placehold.co/300x200/FF6347/ffffff?text=Nike',
            category: 'clothing',
            inStock: true,
            rating: 4.5
        },
        {
            id: 3,
            name: 'Cuisinart Coffee Maker',
            description: 'Cafetière programmable 12 tasses avec carafe en verre',
            price: 89.99,
            imageUrl: 'https://placehold.co/300x200/4682B4/ffffff?text=Coffee',
            category: 'home',
            inStock: false,
            rating: 4.2
        },
        {
            id: 4,
            name: 'Canon EOS R50',
            description: 'Appareil photo hybride 24MP avec objectif kit 18-45mm',
            price: 679.99,
            imageUrl: 'https://placehold.co/300x200/2F4F4F/ffffff?text=Canon',
            category: 'electronics',
            inStock: true,
            rating: 4.7
        },
        {
            id: 5,
            name: 'Yoga Mat Premium',
            description: 'Tapis de yoga antidérapant 6mm épaisseur, écologique',
            price: 45.50,
            imageUrl: 'https://placehold.co/300x200/9370DB/ffffff?text=Yoga',
            category: 'sports',
            inStock: false,
            rating: 4.3
        },
        {
            id: 6,
            name: 'The Witcher 3: Wild Hunt',
            description: 'Jeu de rôle en monde ouvert dans un univers fantasy sombre',
            price: 39.99,
            imageUrl: 'https://placehold.co/300x200/8B0000/ffffff?text=Witcher',
            category: 'gaming',
            inStock: true,
            rating: 4.9
        },
        {
            id: 7,
            name: 'Nike Air Max 270',
            description: 'Baskets de running avec technologie Air Max visible',
            price: 149.99,
            imageUrl: 'https://placehold.co/300x200/FF6347/ffffff?text=Nike',
            category: 'clothing',
            inStock: true,
            rating: 4.5
        },
        {
            id: 8,
            name: 'Cuisinart Coffee Maker',
            description: 'Cafetière programmable 12 tasses avec carafe en verre',
            price: 89.99,
            imageUrl: 'https://placehold.co/300x200/4682B4/ffffff?text=Coffee',
            category: 'home',
            inStock: false,
            rating: 4.2
        },
        {
            id: 9,
            name: 'Canon EOS R50',
            description: 'Appareil photo hybride 24MP avec objectif kit 18-45mm',
            price: 679.99,
            imageUrl: 'https://placehold.co/300x200/2F4F4F/ffffff?text=Canon',
            category: 'electronics',
            inStock: true,
            rating: 4.7
        },
        {
            id: 10,
            name: 'Yoga Mat Premium',
            description: 'Tapis de yoga antidérapant 6mm épaisseur, écologique',
            price: 45.50,
            imageUrl: 'https://placehold.co/300x200/9370DB/ffffff?text=Yoga',
            category: 'sports',
            inStock: false,
            rating: 4.3
        }
    ]

    get totalProducts(): number {
        return this.products.length;
    }

    get productsInStock(): number {
        return this.products.filter(p => p.inStock).length;
    }
}
