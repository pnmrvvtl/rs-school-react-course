import { Product } from './product.type';
import { ReactNode, RefObject } from 'react';

export interface CardProps {
  product: Product;
}

export interface NavigationProps {
  children?: ReactNode;
}

export interface InputTextProps {
  myRef: RefObject<HTMLInputElement>;
  error: string | undefined;
  title: string;
  name: string;
}

export interface InputSelectProps {
  name: string;
  myRef: RefObject<HTMLSelectElement>;
  error: string | undefined;
  options: string[];
}
