import { Category } from '@/features/Category';

import axios from './config';

export async function getCategoriesTree() {
  return axios.get<Category[]>('/categories/tree');
}
