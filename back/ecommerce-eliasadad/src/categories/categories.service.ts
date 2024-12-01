import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "./categories.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./categories.entity";
import { Repository } from "typeorm";


@Injectable()
export class CategoryService {
    constructor(private categoryRepository: CategoryRepository) { }


    addCategories() {
        return this.categoryRepository.addCategories()
    }


    getCategories() {
        return this.categoryRepository.getCategories()
    }
}