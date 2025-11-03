import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";


@Component({
    selector: 'app-hero-section',
    standalone: true,
    imports: [ButtonModule, RouterLink],
    templateUrl: './hero-section.component.html',
    styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent {}

