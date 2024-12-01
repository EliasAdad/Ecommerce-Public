import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './orderDetails/orderDetails.module';
import { CategoryModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm'),
    }),
    UsersModule, ProductsModule, AuthModule, OrdersModule, OrderDetailsModule, CategoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
