import { Component } from '@angular/core';
import {ProductCard} from "../product-card/product-card";

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {
    products = [
        {title: "Ficus", price: 19.99, inStock:true},
        {title: "Cactus", price: 9.99, inStock:true},
        {title: "Monstera", price: 29.99, inStock:true},
        {title: "Aloe Vera", price: 7.99, inStock:true},
        {title: "Ficus", price: 19.99, inStock:true},
        {title: "Cactus", price: 9.99, inStock:true},
        {title: "Monstera", price: 29.99, inStock:true},
        {title: "Aloe Vera", price: 7.99, inStock:true},
        {title: "Ficus", price: 19.99, inStock:true},
        {title: "Cactus", price: 9.99, inStock:true},
        {title: "Monstera", price: 29.99, inStock:true},
        {title: "Aloe Vera", price: 7.99, inStock:true}
    ];
}
