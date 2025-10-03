import { Component } from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet} from '@angular/router';
import {Footer} from "./features/core/components/footer/footer";
import {Header} from "./features/core/components/header/header";
import {LoadingService} from "./features/core/services/loadingService";

@Component({
  selector: 'app-root',
    imports: [RouterOutlet, Footer, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
    constructor(private router: Router, public loadingService: LoadingService) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.loadingService.show();
            }
            if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
                this.loadingService.hide();
            }
        });
    }
}