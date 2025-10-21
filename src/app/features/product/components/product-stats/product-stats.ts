import { Component, input } from '@angular/core';

@Component({
    selector: 'app-product-stats',
    standalone: true,
    templateUrl: './product-stats.html',
    styleUrls: ['./product-stats.scss']
})
export class ProductStatsComponent {
    cartCount = input(0);
    favoriteCount = input(0);
}
