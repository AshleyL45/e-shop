import { Component } from '@angular/core';
import {ErrorCardComponent} from "../components/error-card-component/error-card-component";

@Component({
    selector: 'app-error-page',
    standalone: true,
    imports: [ErrorCardComponent],
    template: `<app-error-card-component></app-error-card-component>`
})
export default class ErrorPage {}
