import { Component } from '@angular/core';
import {HeroSectionComponent} from "../../hero-section/hero-section.component/hero-section.component";

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [HeroSectionComponent],
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss']
})

export default class HomePage {}
