import { Subcategory } from '@/features/categories';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryColumn('int')
  id: number;

  @Column('varchar', { length: 150 })
  name: string;

  @Column('float')
  price: number;

  @Column({ name: 'unit_price', type: 'float' })
  unitPrice: number;

  @Column({ name: 'unit_quantity', type: 'varchar', length: 15 })
  unitQuantity: string;

  @Column({ name: 'in_stock', type: 'int' })
  inStock: number;

  @Column('varchar', { length: 1000, nullable: true })
  details: string | null;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.products)
  @JoinColumn({ name: 'subcategory_id' })
  subcategory: Subcategory;
}
