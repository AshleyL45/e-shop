import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-plant-gallery',
    templateUrl: './plant-gallery.html',
    styleUrls: ['plant-gallery.scss'],
})
export class PlantGallery {
    private http = inject(HttpClient);

    plants = signal<Plant[]>([]);
    isLoading = signal<boolean>(false);
    error = signal<string | null>(null);

    ngOnInit() {
        this.loadPlants();
    }

    async loadPlants() {
        try {
            this.isLoading.set(true);
            this.error.set(null);

            const response = await firstValueFrom(
                this.http.get<any>(
                    'https://perenual.com/api/species-list?key=sk-uFrX68f5eddc2da6613002&page=1'
                )
            );

            const plantList: Plant[] = response.data.map((p: any) => ({
                id: p.id,
                common_name: p.common_name || 'Unknown plant',
                scientific_name: p.scientific_name || [],
                image_url: p.default_image?.medium_url || 'https://via.placeholder.com/150',
                watering: p.watering || 'unknown',
                sunlight: p.sunlight || [],
                liked: false,
                likes: 0
            }));

            this.plants.set(plantList);
        } catch (err) {
            console.error('Erreur API:', err);
            this.error.set('Impossible de charger les plantes.');
        } finally {
            this.isLoading.set(false);
        }
    }

    toggleLike(plantId: number) {
        this.plants.update((list) =>
            list.map((plant) =>
                plant.id === plantId
                    ? {
                        ...plant,
                        liked: !plant.liked,
                        likes: plant.liked ? plant.likes - 1 : plant.likes + 1,
                    }
                    : plant
            )
        );
    }

    async refresh() {
        await this.loadPlants();
    }
}