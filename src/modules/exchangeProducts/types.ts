export interface Product {
    id: number;
    name: string;
    serial?: string | null;
    lot?: string | null;
    image: string;
    quantity:number;
    points?:number;
    price?:number;
    description: string;
    category_id: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    presentation?:string,
    discount?:number
}

export interface productExchange {
    id: number;
    quantity: number;
    points: number;
    price?: number;
    status: boolean;
    start_date: string;
    end_date: string;
    product_id: number;
    isExchange:boolean;
    features?: string [];
    product: Product;
}