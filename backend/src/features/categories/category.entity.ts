import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Subcategory } from './subcategory.entity';

@Entity()
export class Category {
  @PrimaryColumn('int')
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category, {
    eager: true,
  })
  subcategories: Subcategory[];
}
