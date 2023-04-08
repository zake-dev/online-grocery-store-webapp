import { MailService } from '@/features/mail';
import { Order } from '@/features/orders/order.entity';
import { ProductsService } from '@/features/products/products.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryDetails } from './delivery-details.entity';
import { PlaceOrderDto } from './dto/place-order.dto';
import { OrderProduct } from './order-product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(DeliveryDetails)
    private deliveryDetailsRepository: Repository<DeliveryDetails>,
    @InjectRepository(OrderProduct)
    private orderProductRepository: Repository<OrderProduct>,
    private productService: ProductsService,
    private mailService: MailService,
  ) {}

  async placeOrder(placeOrderDto: PlaceOrderDto): Promise<void> {
    await Promise.allSettled([
      this.productService.sellMany(placeOrderDto.products),
      this.saveOrderDetails(placeOrderDto),
      this.mailService.sendOrderConfirmationMail(placeOrderDto),
    ]);
  }

  private async saveOrderDetails(placeOrderDto: PlaceOrderDto) {
    const order = Order.from(placeOrderDto);
    const { raw: deliveryDetailsResult } =
      await this.deliveryDetailsRepository.insert(order.deliveryDetails);
    const { raw: orderResult } = await this.ordersRepository.insert({
      ...order,
      deliveryDetailsId: deliveryDetailsResult.insertId,
    });

    await Promise.allSettled(
      placeOrderDto.products.map((product) =>
        this.orderProductRepository.insert({
          orderId: orderResult.insertId,
          productId: product.id,
          quantity: product.quantity,
        }),
      ),
    );
  }
}
