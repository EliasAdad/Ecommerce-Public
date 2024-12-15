import { Category } from "src/categories/categories.entity"
import { OrderDetail } from "src/orderDetails/orderDetails.entity"

export class ProductsDto {

    name: string

    description: string

    price: number

    stock: number

    imgUrl: string

    category: Category

    orderDetails: OrderDetail[]
}