import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Footer } from "./core/components/footer/footer";
import { Header } from "./core/components/header/header";
import { LoadingService } from "./core/services/loadingService";
import { LayoutService } from "./core/services/layout-service";
import {GlobalSpinner} from "./core/components/global-spinner/global-spinner";
import {ToastError} from "./features/error/components/toast-error/toast-error";
import {AppNotification} from "./shared/components/app-notification";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, Footer, Header, GlobalSpinner, ToastError, AppNotification],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    constructor(
        private router: Router,
        public loadingService: LoadingService,
        public layoutService: LayoutService
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) this.loadingService.show();
            if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError)
                this.loadingService.hide();
        });
    }
}
