import { Category } from "src/categories/categories.entity";
import { OrderDetail } from "src/orderDetails/orderDetails.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 50, unique: true })
    name: string

    @Column({ type: 'text' })
    description: string

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number

    @Column({ type: 'int', nullable: false })
    stock: number

    @Column({ default: "https://ih1.redbubble.net/image.4905811447.8675/flat,750x,075,f-pad,750x1000,f8f8f8.webp" })
    imgUrl?: string

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Category

    @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
    orderDetails: OrderDetail[]
}
