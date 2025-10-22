import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../services/notification.service';

@Component({
    selector: 'app-notification',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (notify.message()) {
            <div class="toast" [ngClass]="notify.type()">
                <span class="text">{{ notify.message() }}</span>
                <button class="close-btn" (click)="close()">✕</button>
            </div>
        }
    `,
    styles: [`
      .toast {
        position: fixed;
        top: 8rem;
        left: 1rem;
        padding: .8rem 1rem;
        border-radius: 8px;
        font-weight: 500;
        color: #fff;
        z-index: 9999;
        animation: fadeIn .3s ease;
      }

      .text {
        flex: 1;
        margin-right: 0.75rem;
        font-family: 'Inter', sans-serif;
      }

      .close-btn {
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 1.1rem;
        font-weight: bold;
        opacity: 0.6;
        transition: opacity 0.2s ease, transform 0.2s ease;
        padding: 0;
        line-height: 1;

        &:hover {
          opacity: 1;
          transform: scale(1.2);
        }

        &:active {
          transform: scale(0.9);
        }
      }
      

      .success {
        border-color: rgb(81, 128, 81);
        background: rgb(141, 189, 141);
        color: #333;

      }

      .info {
        border-color: rgb(69, 125, 147);
        background: rgb(101, 174, 195);
        color: #333;

      }

      .warn {
        border-color: rgb(138, 105, 75);
        background: rgb(221, 173, 138);
        color: #333;
      }

      .error {
        border-color: rgb(128, 57, 52);
        background: rgb(240, 113, 103);
        color: #333;

      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateX(-10px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `]
})
export class AppNotification {
    notify = inject(NotificationService);

    close() {
        this.notify.message.set(null);
    }
}
