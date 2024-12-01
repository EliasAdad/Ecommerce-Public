import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderDetail } from "./orderDetails.entity";



@Module({
    imports: [TypeOrmModule.forFeature([OrderDetail])],
    controllers: [],
    providers: []
})
export class OrderDetailsModule {

}