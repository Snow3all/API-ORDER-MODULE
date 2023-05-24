import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';

export type ProductsDocument = Products & Document;

@Schema()
export class Products {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  detail: string;

  @Prop({ required: true })
  price: string;

  @Prop({ default: Date.now() })
  createDate: Date;

  @Prop({ default: Date.now() })
  updateDate: Date;
}
export const ProductsSchema = SchemaFactory.createForClass(Products);
