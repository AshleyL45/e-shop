import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import {FormsModule} from "@angular/forms";
import {Shoppingcart} from "../components/shoppingcart/shoppingcart";

@Component({
    selector: 'app-cart.page',
    standalone: true,
    imports: [CommonModule, ButtonModule, InputNumberModule, FormsModule, Shoppingcart],
    template: `
<app-shoppingcart></app-shoppingcart>
  `,
    styles: [`
  `]
})
export default class CartPage {

}
