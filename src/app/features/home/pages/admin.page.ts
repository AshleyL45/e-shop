import { Component } from '@angular/core';
import { OrderHistory } from '../../admin/components/order-history/order-history';


@Component({
    selector: 'app-admin.page',
    standalone: true,
    imports: [OrderHistory],
    template: `
        <section class="admin-container">
            <h2>Historique des commandes</h2>
            <app-order-history></app-order-history>
        </section>
    `,
    styles: [`
    .admin-container {
      padding: 2rem;
    }
  `]
})
export default class AdminPage {}
