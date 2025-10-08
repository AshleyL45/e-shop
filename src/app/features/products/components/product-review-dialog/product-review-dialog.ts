import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Review } from '../../models/review.model';

@Component({
    selector: 'app-product-review-dialog',
    standalone: true,
    imports: [CommonModule, DialogModule, RatingModule, FormsModule, ButtonModule],
    templateUrl: './product-review-dialog.html',
    styleUrls: ['./product-review-dialog.scss']
})
export class ProductReviewDialogComponent {

    visible = input<boolean>(false);
    productName = input<string>('');

    reviewSubmitted = output<Review>();
    closed = output<void>();

    rating = 0;
    comment = '';

    submitReview(): void {
        if (this.rating > 0) {
            this.reviewSubmitted.emit({
                productId: 0,
                rating: this.rating,
                comment: this.comment.trim(),
                date: new Date()
            });

            this.reset();
        }
    }


    close(): void {
        this.reset();
        this.closed.emit();
    }

    private reset(): void {
        this.rating = 0;
        this.comment = '';
    }
}
