import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsDto } from "./products.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorator/roles/roles.decorator";
import { Role } from "src/enum/role.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdateProductsDto } from "./update-products.dto";

@ApiTags("Products")
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