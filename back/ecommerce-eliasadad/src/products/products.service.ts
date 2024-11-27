import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Product } from "./products.entity";
import { ProductsDto } from "./products.dto";

@Injectable()
export class ProductsService {
    constructor(private productsRepository: ProductsRepository) { }

    getAllProducts(page: number, limit: number) {
        return this.productsRepository.getAllProducts(page, limit);
    }

    getProductById(id: number) {
        return this.productsRepository.getProductById(id)
    }

    addProduct(product: ProductsDto) {
        return this.productsRepository.addProduct(product)
    }

    updateProductList(id: number, data: ProductsDto) {
        return this.productsRepository.updateProductList(id, data)
    }

    deleteProduct(id: number) {
        return this.productsRepository.deleteProduct(id)
    }
}