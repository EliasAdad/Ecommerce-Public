import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Order } from "./orders.entity";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./orders.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) { }

    @Post()
    @UseGuards(AuthGuard)
    addOrder(@Body() order: CreateOrderDto) {
        return this.ordersService.addOrder(order)
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getOrder(@Param('id') id: string) {
        return this.ordersService.getOrder(id)
    }
} 