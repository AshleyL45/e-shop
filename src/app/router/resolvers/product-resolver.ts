import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ProductApiService } from '../../features/product/services/product-api.service';
import { LoadingService } from '../../core/services/loadingService';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Product } from '../../features/product/models/product.model';

export const productsResolver: ResolveFn<Product[]> = () => {
    const api = inject(ProductApiService);
    const loading = inject(LoadingService);


    return from(api.getProducts()).pipe(
    );
};
