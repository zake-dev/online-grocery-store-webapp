import { FilterProductQuery } from '@/features/products';
import { PaginatedQuery } from '@/interfaces';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  findAll(
    @Query() query: Partial<PaginatedQuery> & Partial<FilterProductQuery>,
  ) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param() params: { id: number }) {
    return this.productsService.findOne(params.id);
  }
}
