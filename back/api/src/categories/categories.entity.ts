import { Product } from "src/products/products.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({ name: 'categories' })
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({ length: 50 })
    name: string

    @OneToMany(() => Product, (product) => product.category)
    products: Product[]
}