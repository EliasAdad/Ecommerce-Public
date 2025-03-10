import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator"
import { Category } from "src/categories/categories.entity"

export class ProductsDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        "description": "The name of the product",
        "example": "Samsung Galaxy s24 Ultra"
    })
    name: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        "description": "A little, short description about the product and it's characteristics",
        "example": "A powerful, efficient smartphone"
    })
    description: string

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @ApiProperty({
        "description": "How much the product costs.",
        "example": 150.00
    })
    price: number

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @ApiProperty({
        "description": "The amount of each product the ecommerce offers.",
        "example": 15
    })
    stock: number

    @IsString()
    @ApiProperty({
        "description": "The url of the product image. If nothing is received, a default url is placed",
        "example": "https://m.media-amazon.com/images/I/61VLy48f5VL._AC_SL1200_.jpg"
    })
    imgUrl?: string

    @IsNotEmpty()
    @ApiProperty({
        "description": "The name of the category each product belongs to",
        "example": "Smartphone"
    })
    category: Category

}