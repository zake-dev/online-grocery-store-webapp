import { FilterProductQuery } from '@/features/products';
import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('tree')
  getCategoryTree(@Query() query: Partial<FilterProductQuery>) {
    return this.categoriesService.findTree(query);
  }
}
