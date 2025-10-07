import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import ProfileForm from "../../components/profile-form.page.ts/profile-form.page";

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, ProfileForm],
    template: `
    <section class="register-page">
      <button class="back-button" (click)="goHome()">
        <i class="pi pi-arrow-left"></i>
        Retourner à l'accueil
      </button>

      <app-profile-form></app-profile-form>
    </section>
  `,
    styles: [`
    .register-page {
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

    app-profile-form {
      z-index: 1;
    }
  `]
})
export default class RegisterPage {
    constructor(private router: Router) {}

    goHome() {
        this.router.navigate(['/']);
    }
}
