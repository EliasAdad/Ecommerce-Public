import { Order } from "src/orders/orders.entity"

export class UserDto {
    email: string
    name: string
    password: string
    address: string
    phone: number
    country?: string | undefined
    city?: string | undefined
    orders: Order[]
}


