import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./products.entity";
import { ProductsDto } from "./products.dto";

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Get()
    getProducts() {
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    getProductById(@Param('id', ParseIntPipe) id: number) {
        const product = this.productsService.getProductById(id)
        return product
    }

    @Post('add')
    addProduct(@Body() product: ProductsDto) {
        return this.productsService.addProduct(product)
    }

    @Put('updateList/:id')
    @HttpCode(200)
    updateProductList(@Param('id', ParseIntPipe) id: number, @Body() data: ProductsDto) {
        return this.productsService.updateProductList(id, data)
    }

    @Delete('delete/:id')
    @HttpCode(200)
    deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.deleteProduct(id)
    }
}