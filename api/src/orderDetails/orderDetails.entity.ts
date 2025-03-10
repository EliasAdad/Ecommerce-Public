import { Order } from "src/orders/orders.entity";
import { Product } from "src/products/products.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'orderDetails' })
export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number

    @OneToOne(() => Order, (order) => order.orderDetail, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id' })
    order: Order

    @ManyToMany(() => Product, (product) => product.orderDetails)
    @JoinTable({ name: 'order_details_products' })
    products: Product[]
}
