import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  findTree(): Promise<Category[]> {
    return this.categoriesRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.subcategories', 'subcategory')
      .leftJoinAndSelect('subcategory.products', 'product')
      .loadRelationCountAndMap(
        'subcategory.productCount',
        'subcategory.products',
      )
      .getMany();
  }
}
