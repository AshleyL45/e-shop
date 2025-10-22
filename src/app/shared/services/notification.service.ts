import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'info' | 'warn' | 'error';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    message = signal<string | null>(null);
    type = signal<NotificationType>('info');

    private show(type: NotificationType, msg: string) {
        this.type.set(type);
        this.message.set(msg);
        setTimeout(() => this.message.set(null), 3000);
    }

    success(msg: string) { this.show('success', msg); }
    info(msg: string) { this.show('info', msg); }
    warn(msg: string) { this.show('warn', msg); }
    error(msg: string) { this.show('error', msg); }
}
