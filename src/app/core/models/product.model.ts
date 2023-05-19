import * as internal from "events";
import {Category} from './category.model'

export interface Product {
  productId: number;
  name: string;
  categoryId: number;
  price: number;
  productImg: string;
  stock: number;
  active: boolean;
  descriptionProduct: string;
  category: Category;

}
