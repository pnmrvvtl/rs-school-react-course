import { Product } from './product.type';
import { ReactNode } from 'react';

export interface CardProps {
  product: Product;
}

export interface NavigationProps {
  children?: ReactNode;
}
