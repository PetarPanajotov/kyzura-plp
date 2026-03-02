export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice: number | null;
    rating: number;
    reviewCount: number;
    image: string;
    category: string;
    onSale: boolean;
    limited: boolean;
    newArrival: boolean;
}