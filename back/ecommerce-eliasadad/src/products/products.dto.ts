import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator"
import { Category } from "src/categories/categories.entity"
import { OrderDetail } from "src/orderDetails/orderDetails.entity"

export class ProductsDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    stock: number

    @IsString()
    imgUrl: string

    @IsNotEmpty()
    category: Category

    // orderDetails: OrderDetail[]
}