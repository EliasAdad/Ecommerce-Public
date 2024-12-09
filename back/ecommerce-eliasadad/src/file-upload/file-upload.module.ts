import { Module } from "@nestjs/common";
import { FileUploadController } from "./file-upload.controller";
import { FileUploadService } from "./file-upload.service";
import { FileUploadRepository } from "./file-upload.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/products/products.entity";
import { CloudinaryConfig } from "src/config/cloudinary";



@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [FileUploadController],
    providers: [FileUploadService, FileUploadRepository, CloudinaryConfig],
    exports: []
})
export class FileUploadModule {

}