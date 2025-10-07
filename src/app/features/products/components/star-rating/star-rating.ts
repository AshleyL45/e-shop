import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';

@Component({
    selector: 'app-star-rating',
    standalone: true,
    imports: [CommonModule, FormsModule, Rating],
    templateUrl: './star-rating.html',
    styleUrls: ['./star-rating.scss']
})
export class StarRatingComponent {
    rating!: number;
    comment!: string;
    reviewSubmit = output<{ rating: number; comment: string }>();

    submit(): void {
        this.reviewSubmit.emit({
            rating: this.rating,
            comment: this.comment
        });
        this.rating = 0;
        this.comment = '';
    }
}
