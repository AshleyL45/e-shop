import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { CartFacade } from '@app/features/cart/services/cart.facade';
import { CartApi } from '@app/features/cart/services/cart.api';
import { CartService } from '@app/features/cart/services/cart.service';
import { NotificationService } from '@app/shared/services/notification.service';
import {environment} from "../../environments/environment";


describe('CartFacade (integration)', () => {
    let facade: CartFacade;
    let http: HttpTestingController;
    let store: CartService;

    beforeEach(() => {
        environment.apiUrl = 'http://localhost:8080/api';
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                provideZonelessChangeDetection(),
                CartFacade,
                CartApi,
                CartService,
                NotificationService,
            ],
        });

        facade = TestBed.inject(CartFacade);
        http = TestBed.inject(HttpTestingController);
        store = TestBed.inject(CartService);
    });

    afterEach(() => {
        http.verify();
    });

    // 1️⃣ ADD PRODUCT
    it('should call API, update store and return cart item (add)', async () => {
        const dto = { id: 1, name: 'Plante verte', price: 25, quantity: 1, imageUrl: 'img.jpg' };

        facade.add(dto);

        const req = http.expectOne(`${environment.apiUrl}/cart`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(dto);

        req.flush({});

        expect(store.items().length).toBe(1);
        expect(store.items()[0].name).toBe('Plante verte');
    });

    // 2️⃣ UPDATE PRODUCT
    it('should call API, update store and update cart item (updateQuantity)', async () => {
        store.addToCart({ id: 2, name: 'Cactus', price: 10, quantity: 1, imageUrl: 'img2.jpg' });

        facade.updateQuantity(2, 3);

        const req = http.expectOne(`${environment.apiUrl}/cart/2`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual({ quantity: 3 });

        req.flush({});
        expect(store.items()[0].quantity).toBe(3);
    });

    // 3️⃣ REMOVE PRODUCT
    it('should call API, update store and remove cart item (remove)', async () => {
        store.addToCart({ id: 3, name: 'Aloe Vera', price: 15, quantity: 1, imageUrl: 'img3.jpg' });

        facade.remove(3);

        const req = http.expectOne(`${environment.apiUrl}/cart/3`);
        expect(req.request.method).toBe('DELETE');
        req.flush({});

        expect(store.items().length).toBe(0);
    });

    // 4️⃣ CLEAR CART
    it('should call API and clear store when clearing cart', async () => {
        store.addToCart({ id: 4, name: 'Palmier', price: 40, quantity: 1, imageUrl: 'img4.jpg' });

        facade.clear();

        const req = http.expectOne(`${environment.apiUrl}/cart/clear`);
        expect(req.request.method).toBe('DELETE');
        req.flush({});

        expect(store.items().length).toBe(0);
    });

    // 5️⃣ CHECKOUT
    it('should call API and validate checkout flow', async () => {
        store.addToCart({ id: 5, name: 'Orchidée', price: 30, quantity: 1, imageUrl: 'img5.jpg' });

        facade.checkout();

        const req = http.expectOne(`${environment.apiUrl}/cart/checkout`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({});

        req.flush({});

        expect(store.items().length).toBe(0);
    });
});
