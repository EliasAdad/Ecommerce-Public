import { Product } from "src/products/products.entity"

export class CreateOrderDto {
    userId: string
    products: Partial<Product[]>
}