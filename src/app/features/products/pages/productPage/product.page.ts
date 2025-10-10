import { Component, inject, ChangeDetectorRef } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { PageTitleComponent } from "../../../core/components/titles/page-title/page-title";
import { ProductListComponent } from "../../components/product-list/product-list.component";
import { Product } from "../../models/product.model";

@Component({
    selector: 'app-product-page',
    standalone: true,
    imports: [PageTitleComponent, ProductListComponent],
    templateUrl: './product.page.html',
    styleUrls: ['./product.page.scss']
})

export default class ProductPage {
    private route = inject(ActivatedRoute);
    private cdr = inject(ChangeDetectorRef);
    private router = inject(Router);

    products: Product[] = [];

    cartCount = 0;
    favoriteCount = 0;
    favoriteIds = new Set<number>();

    onProductAddedToCart(product: Product) {
        this.cartCount++;
    }

    onProductAddedToFavorites(product: Product) {
        if (!this.favoriteIds.has(product.id)) {
            this.favoriteIds.add(product.id);
            this.favoriteCount = this.favoriteIds.size;
            console.log(`❤️ Ajouté : ${product.name}`);
        }
    }

    onProductRemovedFromFavorites(product: Product) {
        if (this.favoriteIds.has(product.id)) {
            this.favoriteIds.delete(product.id);
            this.favoriteCount = this.favoriteIds.size;
            console.log(`💔 Retiré : ${product.name}`);
        }
    }

    goToDetail(product: Product) {
        this.router.navigate(['/products', product.id]);
    }

    ngOnInit() {
        this.products = this.route.snapshot.data['products'];

        setTimeout(() => {
            this.products = [
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
                },
                {
                    id: 6,
                    name: 'Lavande',
                    description: 'Plante d’extérieur parfumée, idéale pour le jardin.',
                    price: 15.00,
                    imageUrl: 'https://www.silencecapousse-chezvous.fr/media/images/30894/rectangle/w900/1751638695/Adopter-la-lavande.jpg',
                    category: 'outdoor',
                    inStock: true,
                    rating: 4.4
                },
                {
                    id: 7,
                    name: 'Olivier en pot',
                    description: 'Petit olivier décoratif pour terrasse ou balcon.',
                    price: 89.99,
                    imageUrl: 'https://www.wismer.fr/wp-content/uploads/2025/01/Capture-decran-2025-01-30-160727.png',
                    category: 'outdoor',
                    inStock: true,
                    rating: 4.7
                },
                {
                    id: 8,
                    name: 'Hortensia Bleu',
                    description: 'Arbuste fleuri aux magnifiques fleurs bleues.',
                    price: 39.99,
                    imageUrl: 'https://www.willemsefrance.fr/cdn/shop/files/87776_2_1800x.jpg?v=1741611826',
                    category: 'outdoor',
                    inStock: false,
                    rating: 4.3
                },
                {
                    id: 9,
                    name: 'Rosier Grimpant',
                    description: 'Rosier robuste produisant de grandes fleurs parfumées.',
                    price: 55.00,
                    imageUrl: 'https://cdn.jacques-briant.fr/11520-large_default/rosier-grimpant-sympathie-rn.jpg',
                    category: 'outdoor',
                    inStock: true,
                    rating: 4.6
                },
                {
                    id: 10,
                    name: 'Bonsaï Ficus',
                    description: 'Petit arbre d’intérieur cultivé en pot, élégant et raffiné.',
                    price: 75.00,
                    imageUrl: 'https://www.picturethisai.com/wiki-image/1080/237573839652880384.jpeg',
                    category: 'indoor',
                    inStock: true,
                    rating: 4.8
                }
            ];

            this.cdr.detectChanges();
        }, 3000);
    }
}
