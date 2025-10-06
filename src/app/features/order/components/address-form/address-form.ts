import {Component, inject} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ShippingFormModel} from "../../models/shipping-form.model";

@Component({
  selector: 'app-address-form',
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './address-form.html',
  styleUrl: './address-form.scss'
})
export class AddressForm {
    protected fb = inject(NonNullableFormBuilder);


    addresses = this.fb.array([
        this.fb.control('', Validators.required)
    ]);

    shippingForm: FormGroup<ShippingFormModel> = this.fb.group({
        addresses: this.addresses
    });
}
