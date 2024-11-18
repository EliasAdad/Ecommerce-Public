import { Injectable } from "@nestjs/common";
import { Products } from "./products.entity";

@Injectable()
export class ProductsRepository {

    private products: Products[] = [{
        id: 1,
        name: 'Laptop',
        description: 'A high-performance laptop.',
        price: 1200,
        stock: true,
        imgUrl: 'https://example.com/laptop.jpg',
    },
    {
        id: 2,
        name: 'Headphones',
        description: 'Noise-cancelling headphones.',
        price: 200,
        stock: true,
        imgUrl: 'https://example.com/headphones.jpg',
    },
    {
        id: 3,
        name: 'Smartphone',
        description: 'A powerful smartphone with a great camera.',
        price: 800,
        stock: false,
        imgUrl: 'https://example.com/smartphone.jpg',
    },
    ]

    async getAllProducts() {
        return this.products;
    }
}