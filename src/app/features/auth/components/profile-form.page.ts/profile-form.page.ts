import { Component, inject } from '@angular/core';
import {
    ReactiveFormsModule,
    FormGroup,
    Validators,
    NonNullableFormBuilder,
    ValidationErrors,
    FormArray,
    AbstractControl,
    ValidatorFn,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileFormModel } from '../../models/profile-form.model';

@Component({
    selector: 'app-profile-form',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './profile-form.page.html',
    styleUrls: ['./profile-form.page.scss'],
})
export default class ProfileForm {
    private fb = inject(NonNullableFormBuilder);

    static readonly passwordsMatchValidator: ValidatorFn = (
        control: AbstractControl<any, any>
    ): ValidationErrors | null => {
        if (!(control instanceof FormGroup)) return null;

        const password = control.get('password')?.value ?? '';
        const confirmPassword = control.get('confirmPassword')?.value ?? '';

        if (!password || !confirmPassword) return null;

        return password === confirmPassword ? null : { passwordMismatch: true };
    };


    profileForm: FormGroup<ProfileFormModel> = this.fb.group(
        {
            name: this.fb.control('', Validators.required),
            age: this.fb.control(18, [Validators.min(0), Validators.max(120)]),
            username: this.fb.control('', [Validators.required, Validators.minLength(3)]),
            email: this.fb.control('', [Validators.required, Validators.email]),
            phone: this.fb.control('', [Validators.pattern(/^0[0-9]{9}$/)]),
            password: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/),]),
            confirmPassword: this.fb.control('', [Validators.required, Validators.minLength(6)]),
            addresses: this.fb.array([this.fb.control('')]),
        },
        { validators: [ProfileForm.passwordsMatchValidator] }
    );

    onSubmit(): void {
        if (this.profileForm.invalid) {
            this.profileForm.markAllAsTouched();
            return;
        }

        console.log('Données du formulaire :', this.profileForm.getRawValue());
        this.profileForm.reset({ name: '', age: 18 });
    }


}
