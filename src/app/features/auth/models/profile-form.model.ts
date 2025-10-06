import { FormArray, FormControl } from '@angular/forms';

export type ProfileFormModel = {
    name: FormControl<string>;
    age: FormControl<number>;
    username: FormControl<string>;
    email: FormControl<string>;
    phone: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
    addresses: FormArray<FormControl<string>>;
};
