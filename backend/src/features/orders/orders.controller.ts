import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PlaceOrderDto } from './dto/place-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async placeOrder(@Body() placeOrderDto: PlaceOrderDto, @Res() res: Response) {
    await this.ordersService.placeOrder(placeOrderDto);
    res.status(HttpStatus.CREATED).send();
  }
}
