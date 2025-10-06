import { Component } from '@angular/core';
import {LoginFormComponent} from "../../components/login-form.component/login-form.component";

@Component({
  selector: 'app-login.page',
    imports: [
        LoginFormComponent
    ],
  template: `
      <section class="login-page">
          <app-login-form></app-login-form>
      </section>

  `,
  styles: `


    .login-page h1 {
      margin-bottom: 1rem;
      font-size: 2rem;
      color: #333;
    }
  `
})
export default class LoginPage {

}
