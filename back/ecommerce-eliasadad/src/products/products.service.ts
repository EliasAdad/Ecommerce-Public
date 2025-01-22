import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Product } from "./products.entity";
import { ProductsDto } from "./products.dto";
import { UpdateProductsDto } from "./update-products.dto";

@Injectable()
export class ProductsService {
    constructor(private productsRepository: ProductsRepository) { }

    getAllProducts(page: number, limit: number) {
        return this.productsRepository.getAllProducts(page, limit);
    }

    getProductById(id: string) {
        return this.productsRepository.getProductById(id)
    }

    addProductsSeeder() {
        return this.productsRepository.addProductsSeeder();
    }

    addProduct(product: ProductsDto) {
        return this.productsRepository.addProduct(product)
    }

    updateProductList(id: string, data: UpdateProductsDto) {
        return this.productsRepository.updateProductList(id, data)
    }

    deleteProduct(id: string) {
        return this.productsRepository.deleteProduct(id)
    }
}