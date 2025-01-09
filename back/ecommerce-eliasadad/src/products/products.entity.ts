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

    @Column({ default: '/Users/eliasadad/Desktop/Image-not-found.png' })
    imgUrl: string

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Category

    @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
    orderDetails: OrderDetail[]
}
