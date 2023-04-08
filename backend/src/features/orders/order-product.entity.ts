import { Product } from '@/features/products';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('ORDER_PRODUCT')
export class OrderProduct {
  @PrimaryColumn({ name: 'order_id', type: 'int' })
  orderId: number;

  @PrimaryColumn({ name: 'product_id', type: 'int' })
  productId: number;

  @Column('int')
  quantity: number;

  @ManyToOne(() => Order, (order) => order.id)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
