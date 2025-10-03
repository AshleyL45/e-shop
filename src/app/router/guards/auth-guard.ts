import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);

    const value = localStorage.getItem("iLovePancakes");
    console.log("authGuard check:", value);

    if (value === "true") {
        return true;
    }

    return router.createUrlTree(['/error']);
};
