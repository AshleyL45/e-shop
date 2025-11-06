import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-order-payment',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './order-payment.html',
    styleUrls: ['./order-payment.scss']
})
export class OrderPayment {
    readonly payment = input.required<any>();
}
