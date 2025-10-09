import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const ok = localStorage.getItem('iLovePancakes') === 'true';

    return ok ? true : router.createUrlTree(['/error']);
};
