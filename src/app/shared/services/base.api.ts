import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export abstract class BaseApi {
    protected http = inject(HttpClient);
    protected readonly BASE_URL: string = environment.apiUrl;

    protected getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json'
        });
    }

    protected async get<T>(endpoint: string): Promise<T> {
        try {
            const response = await firstValueFrom(
                this.http.get<T>(`${this.BASE_URL}${endpoint}`, { headers: this.getHeaders() })
            );

            await new Promise(res => setTimeout(res, 0));
            return response;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    protected async post<T>(endpoint: string, body: any): Promise<T> {
        try {
            return await firstValueFrom(
                this.http.post<T>(`${this.BASE_URL}${endpoint}`, body, { headers: this.getHeaders() })
            );
        } catch (error) {
            throw this.handleError(error);
        }
    }

    protected async put<T>(endpoint: string, body: any): Promise<T> {
        try {
            return await firstValueFrom(
                this.http.put<T>(`${this.BASE_URL}${endpoint}`, body, { headers: this.getHeaders() })
            );
        } catch (error) {
            throw this.handleError(error);
        }
    }

    protected async delete<T>(endpoint: string): Promise<T> {
        try {
            return await firstValueFrom(
                this.http.delete<T>(`${this.BASE_URL}${endpoint}`, { headers: this.getHeaders() })
            );
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private handleError(error: any): Error {
        if (error instanceof HttpErrorResponse) {
            switch (error.status) {
                case 400: return new Error('Données invalides');
                case 401: return new Error('Non autorisé');
                case 403: return new Error('Accès interdit');
                case 404: return new Error('Ressource non trouvée');
                case 500: return new Error('Erreur serveur');
                default:  return new Error('Erreur réseau');
            }
        }
        return new Error('Erreur inconnue');
    }

    // TODO :
    // - handleError à revoir
    // - orderModel : séparer shipping, adress, payment
    // - app.ts : loadingService à injecter ailleurs
    // - injection du service à vérifier (utiliser inject() proprement)
    // - intégrer les notifications PrimeNG ou design similaire
}
