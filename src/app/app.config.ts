import {
    ApplicationConfig,
    importProvidersFrom,
    provideBrowserGlobalErrorListeners,
    provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './router/app.routes';
import {providePrimeNG} from "primeng/config";
import Aura from '@primeuix/themes/lara';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {loadingInterceptor} from "./core/interceptors/loading.interceptor";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        provideRouter(routes),
        provideAnimations(),
        provideHttpClient(),
        provideHttpClient(withInterceptors([loadingInterceptor])),
        importProvidersFrom(ToastModule),
        MessageService,


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