import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./orders.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";


@ApiBearerAuth()
@ApiTags("Orders")
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
    getOrder(@Param('id') id: string, @Req() request: any) {
        const userId = request.user.id

        return this.ordersService.getOrder(id, userId)
    }
} 