import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model, Types } from 'mongoose';
import { User, UsersDocument } from './schema/user.schema';
import { Order, OrderDocument } from './schema/orderActiom.schema';
import { OrderHistory, OrderHistoryDocument } from './schema/order.schema';
import { Products, ProductsDocument } from './schema/products.schema';
import { TokenData } from './dto/user.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UsersDocument>,
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    @InjectModel(OrderHistory.name)
    private readonly orderHistoryModel: Model<OrderHistoryDocument>,
    @InjectModel(Products.name)
    private readonly productModel: Model<ProductsDocument>,
  ) {}

  async createOrder(body: any, res: Response) {
    try {
      const { payload, data } = body.data;
      const getProduct = await this.productModel.findOne({
        _id: data.productId,
      });
      const order = new this.orderModel({
        customer: payload.name,
        customerId: payload._id,
        product: getProduct.name,
        productId: getProduct._id,
        address: data.address,
        price: getProduct.price,
        createDate: new Date(),
        updateDate: new Date(),
      });
      const _order = await order.save();
      const history = await this.orderHistoryModel.findOne({
        customerId: payload._id,
      });
      await this.orderHistoryModel.findOneAndUpdate(
        {
          customerId: payload._id,
        },
        {
          history: [
            ...history.history,
            {
              createDate: new Date(),
              orderId: new Types.ObjectId(_order._id),
              totalPrice: getProduct.price,
            },
          ],
        },
        { new: true, upsert: true },
      );
      return res.status(200).json({
        statusCode: 0,
        responseData: { data: _order },
        message: 'Success',
      });
    } catch (e) {
      return res.status(200).json({
        statusCode: 999,
        message: e,
      });
    }
  }

  async cancelOrder(body: any, res: Response) {
    try {
      const { payload, data } = body.data;
      await this.orderModel.findByIdAndDelete({
        _id: data.orderId,
      });
      const history = await this.orderHistoryModel.findOne({
        customerId: payload._id,
      });
      const deleteHistory = history.history.filter(
        (val) => val.orderId.toString() !== data.orderId,
      );
      await this.orderHistoryModel.updateOne(
        { customerId: payload._id },
        { history: deleteHistory },
      );
      return res.status(200).json({
        statusCode: 0,
        message: 'Success',
      });
    } catch (e) {
      return res.status(200).json({
        statusCode: 999,
        message: e,
      });
    }
  }

  async getUserOrder(body: TokenData, res: Response) {
    try {
      const { _id } = body.data;
      const userOrder = await this.userModel
        .findOne({ _id: _id })
        .select('orederRef')
        .populate('orderRef');
      return res.status(200).json({
        statusCode: 0,
        responseData: { data: userOrder },
        message: 'Success',
      });
    } catch (e) {
      return res.status(200).json({
        statusCode: 999,
        message: e,
      });
    }
  }
}
