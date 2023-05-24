import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { TokenData } from './dto/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/create')
  createOrder(@Body() body: any, @Res() res: Response) {
    return this.appService.createOrder(body, res);
  }

  @Post('/cancel')
  cancelOrder(@Body() body: TokenData, @Res() res: Response) {
    return this.appService.cancelOrder(body, res);
  }

  @Post('/order')
  getOrderInfo(@Body() body: TokenData, @Res() res: Response) {
    return this.appService.getOrderInfo(body, res);
  }
}
