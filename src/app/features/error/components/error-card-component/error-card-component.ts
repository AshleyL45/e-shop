import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { Router } from "@angular/router";

@Component({
    selector: 'app-error-card-component',
    standalone: true,
    imports: [Button],
    templateUrl: './error-card-component.html',
    styleUrls: ['./error-card-component.scss']
})
export class ErrorCardComponent {
    private router = inject(Router);

    goHome() {
        this.router.navigate(['/']);
    }
}
