import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsDto } from "./products.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorator/roles/roles.decorator";
import { Role } from "src/enum/role.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdateProductsDto } from "./update-products.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Repository } from "typeorm";
import { ProductsRepository } from "./products.repository";

@ApiTags("Products")
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService,
        private productRepository: ProductsRepository
    ) { }

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


    @Get(':productName')
    getByName(@Param("productName") name: string) {
        const product = this.productRepository.getByName(name)

        if (!product) throw new NotFoundException("Product not found")

        return product
    }



    @Get(':id')
    getProductById(@Param('id', ParseUUIDPipe) id: string) {
        const product = this.productsService.getProductById(id)

        if (!product) return "Product not found"

        return product
    }



    @ApiBearerAuth()
    @Post('add')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    addProduct(@Body() product: ProductsDto) {
        return this.productsService.addProduct(product)
    }

    @ApiBearerAuth()
    @Put('updateList/:id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    updateProductList(@Param('id') id: string, @Body() data: UpdateProductsDto) {
        return this.productsService.updateProductList(id, data)
    }

    @ApiBearerAuth()
    @Delete('delete/:id')
    @UseGuards(AuthGuard, RolesGuard)
    deleteProduct(@Param('id') id: string) {
        return this.productsService.deleteProduct(id)
    }
}