import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./categories.entity";
import { CategoryController } from "./categories.controller";
import { CategoryService } from "./categories.service";
import { CategoryRepository } from "./categories.repository";



@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoryController],
    providers: [CategoryService, CategoryRepository]
})
export class CategoryModule { }