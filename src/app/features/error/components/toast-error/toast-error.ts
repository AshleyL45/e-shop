import { Component, inject } from '@angular/core';
import { ErrorService } from '../../../../core/services/error.service';

@Component({
    selector: 'toast-error',
    template: `
    @if (error()) {
      <div class="toast">{{ error() }}</div>
    }
  `,
    styles: [`
      .toast {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        background: #146220;
        color: white;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        font-weight: 500;
      }
    `]
})
export class ToastError {
    error = inject(ErrorService).error;
}
