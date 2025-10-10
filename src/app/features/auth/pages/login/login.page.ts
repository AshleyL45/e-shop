import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormComponent } from "../../components/login-form.component/login-form.component";
import {BackButtonComponent} from "../../../core/components/back-button/back-button";

@Component({
    selector: 'app-login.page',
    imports: [LoginFormComponent, BackButtonComponent],
    template: `
        <section class="login-page">
            <app-back-button targetRoute="/">Retourner sur la page d'accueil</app-back-button>


            <app-login-form></app-login-form>
        </section>
    `,
    styles: [`
      .login-page {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: #f5f7fa;
        position: relative;
      }

      .back-button {
        position: absolute;
        top: 20px;
        left: 20px;
        background: none;
        border: none;
        color: #333;
        font-size: 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        transition: color 0.3s, transform 0.2s;
      }

      .back-button:hover {
        color: #1b5e20;
        transform: translateX(-3px);
      }

      .pi {
        font-size: 1.1rem;
      }
      
    `]
})
export default class LoginPage {

}
