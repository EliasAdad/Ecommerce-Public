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
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';



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
    UsersModule, ProductsModule, AuthModule, OrdersModule, OrderDetailsModule, CategoryModule, FileUploadModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1hr' },
      secret: process.env.JWT_SECRET,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
