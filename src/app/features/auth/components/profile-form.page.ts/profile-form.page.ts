import { Component, inject } from '@angular/core';
import {
    ReactiveFormsModule,
    FormGroup,
    Validators,
    NonNullableFormBuilder,
    FormArray,
    FormControl,
    ValidatorFn,
    AbstractControl,
    ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Divider } from 'primeng/divider';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-profile-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, Divider, RouterLink],
    templateUrl: './profile-form.page.html',
    styleUrls: ['./profile-form.page.scss'],
})
export default class ProfileFormPage {
    private fb = inject(NonNullableFormBuilder);

    static readonly passwordsMatchValidator: ValidatorFn = (
        control: AbstractControl
    ): ValidationErrors | null => {
        const password = control.get('password')?.value ?? '';
        const confirm = control.get('confirmPassword')?.value ?? '';
        if (!password || !confirm) return null;
        return password === confirm ? null : { passwordMismatch: true };
    };

    profileForm: FormGroup = this.fb.group(
        {
            name: this.fb.control('', Validators.required),
            username: this.fb.control('', [Validators.required, Validators.minLength(3)]),
            email: this.fb.control('', [Validators.required, Validators.email]),
            age: this.fb.control(null, [Validators.required, Validators.min(0), Validators.max(100)]),
            phone: this.fb.control('', [Validators.pattern(/^(?:\+|00)?[\d\s\-.]{6,20}$/)]),
            password: this.fb.control('', [
                Validators.required,
                Validators.minLength(6),
                Validators.pattern(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
                ),
            ]),
            confirmPassword: this.fb.control('', [Validators.required]),
            addresses: this.fb.array([this.fb.control('')]),
        },
        { validators: [ProfileFormPage.passwordsMatchValidator] }
    );

    get addresses(): FormArray<FormControl<string>> {
        return this.profileForm.get('addresses') as FormArray<FormControl<string>>;
    }

    addAddress(): void {
        this.addresses.push(this.fb.control(''));
    }

    removeAddress(index: number): void {
        this.addresses.removeAt(index);
    }


    controlValid(controlName: string): boolean {
        const ctrl = this.profileForm.get(controlName);
        return !!ctrl && ctrl.valid && ctrl.touched;
    }

    controlInvalid(controlName: string): boolean {
        const ctrl = this.profileForm.get(controlName);
        return !!ctrl && ctrl.invalid && ctrl.touched;
    }

    onSubmit(): void {
        const formCopy = { ...this.profileForm.value };
        delete formCopy.addresses;

        if (this.profileForm.invalid) {
            this.profileForm.markAllAsTouched();
            return;
        }

        console.log('Données du formulaire :', formCopy);
        this.profileForm.reset({ age: 18 });
    }
}
