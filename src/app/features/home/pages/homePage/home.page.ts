import { Component } from '@angular/core';
import {HeroSectionComponent} from "../../hero-section/hero-section.component/hero-section.component";
import {Meta, Title} from "@angular/platform-browser";

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [HeroSectionComponent],
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss']
})

export default class HomePage {

    constructor(private title: Title, private meta: Meta) {
    }

    ngOnInit(): void {
        this.title.setTitle('Plantes d’intérieur haut de gamme | eShop');
        this.meta.updateTag({
            name: 'description',
            content: 'Découvrez nos plantes d’intérieur haut de gamme, sélectionnées pour leur beauté et leur résistance. Apportez la nature chez vous avec élégance.'
        });
    }

}