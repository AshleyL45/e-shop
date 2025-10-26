import { Component, OnInit, Signal } from '@angular/core';
import { InputNumber } from "primeng/inputnumber";
import { FormsModule } from "@angular/forms";
import {CurrencyPipe} from "@angular/common";
import { ButtonDirective } from "primeng/button";
import { CartService, CartItem } from '../../services/cart.service';

@Component({
    selector: 'app-shoppingcart',
    imports: [
        InputNumber,
        FormsModule,
        ButtonDirective,
        CurrencyPipe,
    ],
    templateUrl: 'shoppingcart.html',
    styleUrl: 'shoppingcart.scss'
})
export class Shoppingcart implements OnInit {

    cartItems!: Signal<CartItem[]>;

    constructor(public cartService: CartService) {}

    ngOnInit(): void {
        this.cartItems = this.cartService.items;
    }

    get subtotal() {
        const items = this.cartItems();
        return items.reduce((acc, item) => acc + item.price * Math.max(item.quantity, 1), 0);
    }

    get total() {
        return this.subtotal + this.tax;
    }


    get tax() {
        return this.subtotal * 0.2;
    }

    removeItem(id: number) {
        this.cartService.removeFromCart(id);
    }

    clearCart(): void {
        this.cartService.clearCart();
    }

    onCheckout(): void {
        this.cartService.checkout();
    }

    onManualQuantityChange(id: number, currentQuantity: number): void {
        this.cartService.updateQuantity(id, currentQuantity);
    }


}
