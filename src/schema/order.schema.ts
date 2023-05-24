import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type OrderHistoryDocument = OrderHistory & Document;

@Schema()
export class OrderHistory {
  @Prop({ required: true })
  customer: string;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  customerId: MongooseSchema.Types.ObjectId;

  @Prop()
  history: [
    {
      createDate: Date;
      orderId: Types.ObjectId;
      status: string;
      totalPrice: number;
    },
  ];
}
export const OrderHistorySchema = SchemaFactory.createForClass(OrderHistory);
