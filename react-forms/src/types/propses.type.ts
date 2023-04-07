import { Product } from './product.type';
import { MouseEventHandler, ReactNode } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FormValues } from './form-values.type';

export interface CardProps {
  product: Product;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export interface NavigationProps {
  children?: ReactNode;
}

export interface InputTextProps {
  error: string | undefined;
  title: string;
  name:
    | 'title'
    | 'price'
    | 'rating'
    | 'discount'
    | 'producedAt'
    | 'category'
    | 'brand'
    | 'publish'
    | 'state'
    | 'photo';
  register: UseFormRegister<FormValues>;
}

export interface InputSelectProps {
  name:
    | 'title'
    | 'price'
    | 'rating'
    | 'discount'
    | 'producedAt'
    | 'category'
    | 'brand'
    | 'publish'
    | 'state'
    | 'photo';
  error: string | undefined;
  options: string[];
  register: UseFormRegister<FormValues>;
}
