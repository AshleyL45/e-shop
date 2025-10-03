import { Component, inject } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { Router } from "@angular/router";

@Component({
    selector: 'app-error-card-component',
    standalone: true,
    imports: [MatButton],
    templateUrl: './error-card-component.html',
    styleUrls: ['./error-card-component.scss']
})
export class ErrorCardComponent {
    private router = inject(Router);

    goHome() {
        this.router.navigate(['/']);
    }
}
