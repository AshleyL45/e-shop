import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ReactiveFormsModule,
    FormGroup,
    NonNullableFormBuilder,
    Validators,
    FormControl
} from '@angular/forms';
import {Divider} from "primeng/divider";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, Divider, RouterLink],
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
    private fb = inject(NonNullableFormBuilder);

    loginForm: FormGroup<{
        email: FormControl<string>;
        password: FormControl<string>;
    }> = this.fb.group({
        email: this.fb.control('', [Validators.required, Validators.email]),
        password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    });

    onSubmit(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }
        console.log('✅ Données de connexion :', this.loginForm.getRawValue());
        this.loginForm.reset();
    }
}
