export type OrderStatus = 'Pending' | 'In Delivery' | 'Delivered';

export type OrderItem = {
    id: number;
    name: string;
    imageUrl: string;
    category: string;
    price: number;
    quantity: number;
};


export interface Address {
    name: string;
    address: string;
    city: string;
    country: string;
    zip: string;
    phone: string;
}

export interface Payment {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    card: string;
}

export type Order = {
    id: string;
    date: string;
    total: number;
    status: 'Pending' | 'In Delivery' | 'Delivered';
    items: OrderItem[];
    billing: {
        name: string;
        address: string;
        city: string;
        country: string;
        zip: string;
        phone: string;
    };
    shipping: {
        name: string;
        address: string;
        city: string;
        country: string;
        zip: string;
        phone: string;
    };
    payment: {
        card: string;
        subtotal: number;
        shipping: number;
        tax: number;
        total: number;
    };
};

