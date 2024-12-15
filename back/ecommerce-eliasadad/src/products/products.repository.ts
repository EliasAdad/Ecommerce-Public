import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./products.entity";
import { User } from "src/users/users.entity";
import * as data from '../utils/seeders/products.json'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "src/categories/categories.entity";
import { ProductsDto } from "./products.dto";

@Injectable()
export class ProductsRepository {

    constructor(
        @InjectRepository(Product) private productsRepository: Repository<Product>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ) { }



    async getAllProducts(page: number = 1, limit: number = 5) {
        const products = await this.productsRepository.find({ relations: { category: true } })
        if (!products.length) return "There are no products to show"

        let productsInStock = products.filter((product) => product.stock > 0)

        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginated = productsInStock.slice(startIndex, endIndex)

        return paginated;
    }

    async addProductsSeeder() {
        const categories = await this.categoryRepository.find()

        data?.map(async (element) => {
            const relatedCategory = categories.find((category) => category.name === element.category)

            const newProduct = new Product()
            newProduct.name = element.name
            newProduct.description = element.description
            newProduct.price = Number(element.price.toFixed(2))
            newProduct.stock = element.stock
            newProduct.category = relatedCategory

            await this.productsRepository.createQueryBuilder()
                .insert()
                .into(Product)
                .values(newProduct)
                .orUpdate(["description", "price", "stock"], ["name"],)
                .execute()
        })

        return 'Products added!'

    }

    async getProductById(id: string) {
        const product = this.productsRepository.findOne({ where: { id } })

        if (!product) return "Product not found"

        return product
    }

    async addProduct(product: ProductsDto) {
        const newProduct = await this.productsRepository.save(product)

        return newProduct
    }

    async updateProductList(id: string, data: Partial<ProductsDto>) {

        const product = await this.productsRepository.findOneBy({ id })

        if (!product) return "Product not found";

        await this.productsRepository.update(id, data)

        return await this.productsRepository.findOneBy({ id })
    }

    async deleteProduct(id: string) {
        const prevDeleted = await this.productsRepository.findOne({ where: { id } })
        await this.productsRepository.delete(id)

        return prevDeleted.id
    }
} 