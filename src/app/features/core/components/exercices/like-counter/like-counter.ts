import { Component, OnInit, signal, computed, effect } from '@angular/core';

@Component({
    selector: 'app-like-counter',
    templateUrl: 'like-counter.html'
})
export class LikeCounter implements OnInit {
    likes = signal(0);
    userName = signal('Utilisateur');

    likeMessage = computed(() => {
        const count = this.likes();
        if (count === 0) return 'Aucun like';
        if (count === 1) return '1 personne aime';
        return `${count} personnes aiment`;
    });

    isPopular = computed(() => this.likes() >= 10);

    ngOnInit() {
        effect(() => {
            console.log(`${this.userName()} a ${this.likes()} likes`);
        });
    }

    setUserName(name: string): void {
        this.userName.set(name);
    }

    resetLikes(): void {
        this.likes.set(0);
    }

    addLike(): void {
        this.likes.update(count => count + 1);
    }

    removeLike(): void {
        this.likes.update(count => count > 0 ? count - 1 : 0);
    }
}