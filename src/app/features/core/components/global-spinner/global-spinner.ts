import { Component, inject } from '@angular/core';
import { LoadingService } from '../../services/loadingService';

@Component({
    selector: 'global-spinner',
    template: `
    @if (loading()) {
      <div class="backdrop">
        <div class="spinner"></div>
      </div>
    }
  `,
    styles: [`
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid #ddd;
      border-top-color: #333;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class GlobalSpinner {
    loading = inject(LoadingService).loading;
}
