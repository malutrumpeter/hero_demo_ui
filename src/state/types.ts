export interface AppState {
    user: string;
    productId: number;
    cartCount: number;
    cart: CartItem[];
    productsInCart: any[];
}

export interface CartItem {
    id: number;
    quantity: number;
    title: string;
    price: number;
    description: string;
    image: string;
    rating: {rate: number; count: number;}
}
