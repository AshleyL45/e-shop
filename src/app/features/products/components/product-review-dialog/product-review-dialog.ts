import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { RatingModule } from 'primeng/rating';

@Component({
    selector: 'app-product-review-dialog',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatButton,
        RatingModule
    ],
    templateUrl: './product-review-dialog.html',
    styleUrls: ['./product-review-dialog.scss']
})
export class ProductReviewDialogComponent {
    private dialogRef = inject(MatDialogRef<ProductReviewDialogComponent>);
    private data = inject(MAT_DIALOG_DATA);

    reviewText = '';
    rating = 0;

    get productName(): string {
        return this.data?.productName ?? '';
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        this.dialogRef.close({
            rating: this.rating,
            review: this.reviewText
        });
    }
}
