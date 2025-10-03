import { ResolveFn } from '@angular/router';
import {Product} from "../../features/products/models/product.model";
import {delay, of, tap} from "rxjs";
import {LoadingService} from "../../features/core/services/loadingService";
import {inject} from "@angular/core";



export const productsResolver: ResolveFn<Product[]> = () => {
    const loadingService = inject(LoadingService);

    loadingService.show();

    return of([
        {
            id: 1,
            name: 'Ficus Lyrata',
            description: 'Plante d’intérieur élégante avec de larges feuilles vertes.',
            price: 59.99,
            imageUrl: 'https://succulentsbox.com/cdn/shop/products/4in-oat_FicusLyrataLittleSunshine_fb503111-5539-4fb7-88d6-8938c49a873a_1200x.jpg?v=1742271841',
            category: 'indoor',
            inStock: true,
            rating: 4.8
        },
        {
            id: 2,
            name: 'Monstera Deliciosa',
            description: 'Plante tropicale populaire aux feuilles perforées uniques.',
            price: 45.00,
            imageUrl: 'https://www.mangoandsalt.com/wp-content/uploads/2016/01/monstera-deliciosa31.jpg',
            category: 'indoor',
            inStock: true,
            rating: 4.7
        },
        {
            id: 3,
            name: 'Pothos Doré',
            description: 'Plante grimpante robuste et facile à entretenir.',
            price: 25.50,
            imageUrl: 'https://i-dj.unimedias.fr/2023/09/12/adobestock435962616-65001d11aac22.jpeg?auto=format,compress&cs=tinysrgb&ixlib=php-4.1.0&w=1200',
            category: 'indoor',
            inStock: false,
            rating: 4.5
        },
        {
            id: 4,
            name: 'Sansevieria',
            description: 'Aussi appelée plante serpent, idéale pour purifier l’air.',
            price: 35.00,
            imageUrl: 'https://img.crocdn.co.uk/images/products2/pl/20/00/03/20/pl2000032082.jpg?width=940&height=940',
            category: 'indoor',
            inStock: true,
            rating: 4.6
        },
        {
            id: 5,
            name: 'Palmier Kentia',
            description: 'Grand palmier d’intérieur apportant une ambiance tropicale.',
            price: 120.00,
            imageUrl: 'https://www.rustica.fr/images/kentia-howeia-forsteriana-bios-1053957.jpg',
            category: 'indoor',
            inStock: true,
            rating: 4.9
        }
    ]);
};
