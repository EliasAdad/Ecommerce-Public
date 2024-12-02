import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./products.entity";
import { ProductsDto } from "./products.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    getProducts(@Query('page') page: number, @Query('limit') limit: number) {
        if (page && limit) {
            return this.productsService.getAllProducts(page, limit)
        }
        return this.productsService.getAllProducts(1, 5);
    }

    @Get('seeder')
    addProductsSeeder() {
        return this.productsService.addProductsSeeder();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getProductById(@Param('id') id: string) {
        const product = this.productsService.getProductById(id)

        return product
    }

    @Post('add')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    addProduct(@Body() product: ProductsDto) {
        return this.productsService.addProduct(product)
    }

    @Put('updateList/:id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    updateProductList(@Param('id') id: string, @Body() data: Product) {
        return this.productsService.updateProductList(id, data)
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    deleteProduct(@Param('id') id: string) {
        return this.productsService.deleteProduct(id)
    }
}