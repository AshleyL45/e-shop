import { ResolveFn } from '@angular/router';

export const helloResolver: ResolveFn<string> = (route, state) => {
    return '👋 Hello, résolu avant affichage';
};