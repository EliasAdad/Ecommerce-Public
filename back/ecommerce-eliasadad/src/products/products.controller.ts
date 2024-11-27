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
        return this.productsService.getAllProducts(page, limit);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getProductById(@Param('id', ParseIntPipe) id: number) {
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
    updateProductList(@Param('id', ParseIntPipe) id: number, @Body() data: ProductsDto) {
        return this.productsService.updateProductList(id, data)
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.deleteProduct(id)
    }
}