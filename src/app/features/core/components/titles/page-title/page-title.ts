import { Component, input } from '@angular/core';

@Component({
    selector: 'app-page-title',
    standalone: true,
    templateUrl: './page-title.html',
    styleUrls: ['./page-title.scss']
})
export class PageTitleComponent {
    text = input<string>('');
}
