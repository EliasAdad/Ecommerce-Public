import { Injectable } from "@nestjs/common";
import { Product } from "./products.entity";
import { User } from "src/users/users.entity";
import { ProductsDto } from "./products.dto";

@Injectable()
export class ProductsRepository {

    private products: Product[] = [{
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
    }
    ]

    async getAllProducts() {
        return this.products;
    }

    async getProductById(id: number) {
        const product = this.products.find((prod) => prod.id === id)
        if (!product) return { error: "The product doesn't exist" }
        return product
    }

    async addProduct(product: ProductsDto) {
        let id: number = this.products.length + 1;
        this.products = [...this.products, { id, ...product }]
        return { id }
    }

    async updateProductList(id: number, data: ProductsDto) {
        const prodIndex = this.products.findIndex((prod) => prod.id === id)

        if (prodIndex === -1) return { error: "The product doesn't exist" }

        this.products[prodIndex] = { ...this.products[prodIndex], ...data }

        return { updated: this.products[prodIndex].id }
    }

    async deleteProduct(id: number) {
        const prodIndex = this.products.findIndex((prod) => prod.id === id)

        if (prodIndex === -1) return { error: "The product doesn't exist" };

        const [deletedProd] = this.products.splice(prodIndex, 1)

        return { deletedProd: deletedProd.id }

    }
}