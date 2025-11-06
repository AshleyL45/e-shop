import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-order-address',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './order-address.html',
    styleUrls: ['./order-address.scss']
})
export class OrderAddress {
    readonly title = input<string>();
    readonly address = input.required<any>();
}
