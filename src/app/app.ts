import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProductCard} from "./features/products/components/product-card/product-card";
import {Footer} from "./features/core/components/footer/footer";
import {Header} from "./features/core/components/header/header";
import {ProductList} from "./features/products/components/product-list/product-list";
import {ImageGallery} from "./features/products/image-gallery/image-gallery";

@Component({
  selector: 'app-root',
    imports: [RouterOutlet, ProductCard, Footer, Header, ProductList, ImageGallery],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('e-shop');
}
