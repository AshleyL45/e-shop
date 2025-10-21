import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loadingService';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    const loading = inject(LoadingService);
    console.log('🟢 Interceptor lancé pour', req.url);
    loading.show();

    return next(req).pipe(
        finalize(() => {
            console.log('🔴 Interceptor terminé pour', req.url);
            loading.hide();
        })
    );
};
