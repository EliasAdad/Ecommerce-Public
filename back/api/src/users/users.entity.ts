import { Order } from "src/orders/orders.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true, type: 'varchar', length: 50, nullable: false })
    email: string

    @Column({ length: 50 })
    name: string

    @Column({ type: 'varchar', nullable: false })
    password: string

    @Column({ type: 'text' })
    address: string

    @Column({ type: 'int' })
    phone: number

    @Column({ length: 50, type: 'varchar' })
    country?: string | undefined

    @Column({ length: 50, type: 'varchar' })
    city?: string | undefined

    @Column({ type: 'boolean', default: false })
    isAdmin?: boolean

    @OneToMany(() => Order, (order) => order.user, { onDelete: 'CASCADE' })
    @JoinColumn()
    orders: Order[]

}


