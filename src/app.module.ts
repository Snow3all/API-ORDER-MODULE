import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema } from './schema/user.schema';
import { OrderHistory, OrderHistorySchema } from './schema/order.schema';
import { Order, OrderSchema } from './schema/orderActiom.schema';
import { Products, ProductsSchema } from './schema/products.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: OrderHistory.name,
        schema: OrderHistorySchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: Products.name,
        schema: ProductsSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
