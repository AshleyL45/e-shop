import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.scss'
})
export class Counter {
    count = 0;
    inputValue = '';

    increment(): void {
        this.count++;
    }

    decrement(): void {
        if (this.count > 0) this.count--;
    }

    reset(): void {
        this.count = 0;
    }

    onKeyUp(event: KeyboardEvent): void {
        this.inputValue = (event.target as HTMLInputElement).value;
    }
}
