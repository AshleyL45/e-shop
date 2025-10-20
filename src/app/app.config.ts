import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './router/app.routes';
import {providePrimeNG} from "primeng/config";
import Aura from '@primeuix/themes/lara';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        provideRouter(routes),
        provideAnimations(),
        provideHttpClient(),

        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.dark-mode'
                }
            }
        })
    ]
};