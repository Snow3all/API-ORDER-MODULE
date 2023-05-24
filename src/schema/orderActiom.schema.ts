import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Products } from './products.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  customer: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  customerId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  product: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: Products.name,
  })
  productId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  price: string;

  @Prop()
  createDate: Date;

  @Prop()
  updateDate: Date;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
