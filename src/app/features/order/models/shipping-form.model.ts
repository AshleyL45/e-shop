import {FormArray, FormControl} from "@angular/forms";

export type ShippingFormModel = {
    addresses: FormArray<FormControl<string>>;
};