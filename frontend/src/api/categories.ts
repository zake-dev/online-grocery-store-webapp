import { Category } from '@/interfaces';

import axios from './config';

export async function getCategoriesTree() {
  return axios.get<Category[]>('/categories/tree');
}
