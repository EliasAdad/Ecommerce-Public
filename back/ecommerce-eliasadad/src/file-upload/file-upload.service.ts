import { Injectable } from "@nestjs/common";
import { FileUploadRepository } from "./file-upload.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/products/products.entity";
import { Repository } from "typeorm";


@Injectable()
export class FileUploadService {
    constructor(
        private fileUploadRepository: FileUploadRepository,
        @InjectRepository(Product) private productRepository: Repository<Product>
    ) { }

    async uploadImage(file: Express.Multer.File, productId: string) {
        const product = this.productRepository.findOne({ where: { id: productId } })

        if (!product) {
            return "Product doesn't exist"
        }

        const upload = await this.fileUploadRepository.uploadImage(file)
        await this.productRepository.update(productId, { imgUrl: upload.secure_url })

        const updated = await this.productRepository.findOne({ where: { id: productId } })
        return updated;

    }

}