import { FilterProductQuery } from '@/features/products';
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

  async findTree(query: Partial<FilterProductQuery>): Promise<Category[]> {
    const categories = await this.categoriesRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.subcategories', 'subcategory')
      .leftJoinAndSelect('subcategory.products', 'product')
      .loadRelationCountAndMap(
        'subcategory.productCount',
        'subcategory.products',
        'product',
        (qb) =>
          qb
            .where('product.name LIKE :name', { name: `%${query.name ?? ''}%` })
            .andWhere('product.price BETWEEN :low AND :high', {
              low: query.priceLow ?? 0,
              high: query.priceHigh ?? 2 ** 31,
            }),
      )
      .getMany();

    categories.forEach((category) =>
      category.subcategories.forEach((subcategory) => {
        delete subcategory.products;
      }),
    );

    return categories;
  }
}
