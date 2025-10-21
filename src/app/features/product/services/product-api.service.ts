import { Injectable } from '@angular/core';
import { BaseApi } from '../../../shared/services/base.api';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductApiService extends BaseApi {
    private readonly endpoint = '/products.json';

    async getProducts(): Promise<Product[]> {
        return this.get<Product[]>(this.endpoint);
    }

    async getProductById(id: string): Promise<Product> {
        const products = await this.get<Product[]>(this.endpoint);
        const product = products.find(p => p.id === Number(id));
        if (!product) throw new Error('Produit non trouvé');
        return product;
    }
}
