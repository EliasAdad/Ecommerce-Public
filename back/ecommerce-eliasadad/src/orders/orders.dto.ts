import { ApiProperty } from "@nestjs/swagger"
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator"
import { Product } from "src/products/products.entity"

export class CreateOrderDto {

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        "description": "The ID of the user who is making the buying order",
        "example": "c51046ed-a15f-4fe8-a177-fcc6ecb6a33f"
    })
    userId: string

    @IsArray()
    @ArrayMinSize(1)
    @ApiProperty({
        "description": "An array of products from the order, only contains the ID of each product.",
        "example": [
            {
                "id": "f412b948-eff4-4be9-8546-27dda76e8955"
            },
            {
                "id": "0a8cdec5-c4cb-401c-9a0a-d34e181e7555"
            }
        ]
    })
    products: Partial<Product[]>
}