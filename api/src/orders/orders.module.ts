import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./orders.entity";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { OrdersRepository } from "./orders.repository";
import { User } from "src/users/users.entity";
import { OrderDetail } from "src/orderDetails/orderDetails.entity";
import { Product } from "src/products/products.entity";



@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderDetail, Product, User])],
    controllers: [OrdersController],
    providers: [OrdersService, OrdersRepository]
})
export class OrdersModule { }