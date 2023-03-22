import React from 'react';
import { Product } from '../../types/product.type';

interface ProductsContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const ProductsContext = React.createContext<ProductsContextType>({
  products: [],
  setProducts: () => {},
});
