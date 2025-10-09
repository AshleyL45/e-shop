import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-temperature',
    imports: [FormsModule],
    templateUrl: './temperature.html',
})
export class Temperature {
    celsiusInput = '';

    celsius = signal(20);

    fahrenheit = computed(() => {
        return (this.celsius() * 9/5) + 32;
    });

    temperatureStatus = computed(() => {
        const temp = this.celsius();
        if (temp < 0) return 'Glacial !';
        if (temp < 10) return 'Très froid';
        if (temp < 20) return 'Frais';
        if (temp < 30) return 'Agréable';
        return 'Chaud !';
    });

    updateTemperature(): void {
        const value = parseFloat(this.celsiusInput);
        if (!isNaN(value)) {
            this.celsius.set(value);
        }
    }
}