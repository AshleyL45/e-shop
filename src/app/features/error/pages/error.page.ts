import { Component } from '@angular/core';
import { ErrorCardComponent } from "../components/error-card/error-card-component";

@Component({
    selector: 'app-error-page',
    standalone: true,
    imports: [ErrorCardComponent],
    template: `<app-error-card></app-error-card>`
})
export default class ErrorPage {}
