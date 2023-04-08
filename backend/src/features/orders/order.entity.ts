import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DeliveryDetails } from './delivery-details.entity';
import { PlaceOrderDto } from './dto/place-order.dto';
import { OrderProduct } from './order-product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'delivery_details_id', type: 'int' })
  deliveryDetailsId: number;

  @Column({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @Column({ name: 'total_quantity', type: 'int' })
  totalQuantity: number;

  @Column({ name: 'total_price', type: 'float' })
  totalPrice: number;

  @OneToOne(() => DeliveryDetails, (deliveryDetails) => deliveryDetails.id)
  @JoinColumn({ name: 'delivery_details_id' })
  deliveryDetails: DeliveryDetails;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProducts: OrderProduct[];

  static from(placeOrderDto: PlaceOrderDto) {
    const order = new Order();
    order.createdAt = new Date();
    order.deliveryDetails = DeliveryDetails.from(placeOrderDto.deliveryDetails);
    order.totalQuantity = placeOrderDto.totalQuantity;
    order.totalPrice = placeOrderDto.totalPrice;

    return order;
  }
}
