import { Product } from '@/features/products';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Subcategory {
  @PrimaryColumn('int')
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @ManyToOne(() => Category, (category) => category.subcategories)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Category;

  @OneToMany(() => Product, (product) => product.subcategory)
  products: Product[];
}
