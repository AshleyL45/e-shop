import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loadingService';
import { Router } from '@angular/router';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    const loading = inject(LoadingService);
    const router = inject(Router);

    const navigationInProgress = !router.navigated;

    if (navigationInProgress) {
        return next(req);
    }

    loading.show();
    return next(req).pipe(
        finalize(() => loading.hide())
    );
};
