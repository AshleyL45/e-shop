// like-counter.ts
import { Component, OnInit, signal, computed, effect } from '@angular/core';

@Component({
    selector: 'app-like-counter',
    templateUrl: './like-counter.html'
})
export class LikeCounter implements OnInit {
    // Signals de base
    likes = signal(0);
    userName = signal('Utilisateur');

    // Computed : valeurs calculées
    likeMessage = computed(() => {
        const count = this.likes();
        if (count === 0) return 'Aucun like';
        if (count === 1) return '1 personne aime';
        return `${count} personnes aiment`;
    });

    isPopular = computed(() => this.likes() >= 10);

    ngOnInit() {
        // Effect : log automatique
        effect(() => {
            console.log(`${this.userName()} a ${this.likes()} likes`);
        });
    }

    // Méthodes avec set()
    setUserName(name: string): void {
        this.userName.set(name);
    }

    resetLikes(): void {
        this.likes.set(0);
    }

    // Méthodes avec update()
    addLike(): void {
        this.likes.update(count => count + 1);
    }

    removeLike(): void {
        this.likes.update(count => count > 0 ? count - 1 : 0);
    }
}