import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { ProfileFormModel } from '../../models/profile-form.model';
import ProfileForm from "../../components/profile-form.page.ts/profile-form.page";
import {AddressForm} from "../../../order/components/address-form/address-form";

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, ProfileForm, AddressForm, ProfileForm],
    templateUrl: 'register.page.html',
    styleUrls: ['register.page.scss']
})
export default class RegisterPage {

}
