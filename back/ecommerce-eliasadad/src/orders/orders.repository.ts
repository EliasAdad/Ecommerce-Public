import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { Repository } from "typeorm";
import { Order } from "./orders.entity";
import { CreateOrderDto } from "./orders.dto";
import { OrderDetail } from "src/orderDetails/orderDetails.entity";
import { Product } from "src/products/products.entity";


@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail>,
        @InjectRepository(Product) private productsRepository: Repository<Product>
    ) { }

    async addOrder(orderData: CreateOrderDto) {
        const { userId, products } = orderData

        let total: number = 0;
        const user = await this.usersRepository.findOneBy({ id: userId })

        if (!user) return "User not found!"

        const order = new Order()
        order.date = new Date()
        order.user = user;

        const newOrder = await this.ordersRepository.save(order);

        const productsArray = await Promise.all(
            products.map(async (element) => {

                const prod = await this.productsRepository.findOne({
                    where: {
                        id: element.id
                    }
                })

                // if (!prod) return "Product not found!"

                total += Number(prod.price)

                await this.productsRepository.update({ id: element.id }, { stock: prod.stock - 1 })

                return prod
            })

        )

        const newOrderDetail = new OrderDetail()
        newOrderDetail.order = newOrder
        newOrderDetail.products = productsArray
        newOrderDetail.price = Number(total.toFixed(2))

        await this.orderDetailRepository.save(newOrderDetail)


        return this.ordersRepository.findOne({
            where: { id: newOrder.id },
            relations: {
                orderDetail: true
            }
        })



    }


    async getOrder(id: string) {

        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: {
                orderDetail: {
                    products: true
                }
            }
        })

        if (!order) return "Order not found"

        return order;
    }
}




