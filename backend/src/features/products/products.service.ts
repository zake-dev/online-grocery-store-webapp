import { Paginated, PaginatedQuery } from '@/interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { FilterProductQuery } from './interfaces/filter-product-query';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(
    query: Partial<PaginatedQuery> & Partial<FilterProductQuery>,
  ): Promise<Paginated<Product>> {
    const page = +query.page || 1;
    const size = +query.size || 10;

    const [content, totalCount] = await this.productsRepository.findAndCount({
      where: {
        categoryId: query.categoryId,
        subcategoryId: query.subcategoryId,
        name: Like(`%${query.name ?? ''}%`),
        price: Between(query.priceLow ?? 0, query.priceHigh ?? 2 ** 31),
      },
      order: { id: 'ASC' },
      skip: (page - 1) * size,
      take: size,
    });

    return {
      pagination: {
        page,
        size,
        totalPage: Math.ceil(totalCount / size),
        totalCount,
      },
      content,
    };
  }

  findOne(id: number) {
    return this.productsRepository.findOne({
      where: { id },
    });
  }
}
