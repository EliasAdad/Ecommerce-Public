import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Order } from "./orders.entity";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./orders.dto";

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) { }

    @Post()
    addOrder(@Body() order: CreateOrderDto) {
        return this.ordersService.addOrder(order)
    }

    @Get(':id')
    getOrder(@Param('id') id: string) {
        return this.ordersService.getOrder(id)
    }
} 