import { Controller, Get } from "@nestjs/common";
import { CategoryService } from "./categories.service";


@Controller('categories')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }


    @Get('seeder')
    addCategories() {
        return this.categoryService.addCategories()
    }

    @Get()
    getCategories() {
        return this.categoryService.getCategories()
    }
}