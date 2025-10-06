import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './router/app.routes';
import {providePrimeNG} from "primeng/config";
import Aura from '@primeuix/themes/lara';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        provideRouter(routes),

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