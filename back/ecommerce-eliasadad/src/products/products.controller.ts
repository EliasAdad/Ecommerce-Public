import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./products.entity";
import { ProductsDto } from "./products.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Get()
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
    getProductById(@Param('id', ParseUUIDPipe) id: string) {
        const product = this.productsService.getProductById(id)

        if (!product) return "Product not found"

        return product
    }

    @Post('add')
    @UseGuards(AuthGuard)
    addProduct(@Body() product: ProductsDto) {
        return this.productsService.addProduct(product)
    }

    @Put('updateList/:id')
    @UseGuards(AuthGuard)
    updateProductList(@Param('id') id: string, @Body() data: Partial<ProductsDto>) {
        return this.productsService.updateProductList(id, data)
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard)
    deleteProduct(@Param('id') id: string) {
        return this.productsService.deleteProduct(id)
    }
}