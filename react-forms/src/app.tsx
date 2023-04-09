//libs
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
//components
import { About, AddProduct, Error, Main, Navigation } from './routes';
//styles
import './styles/style.scss';
//context
import { SearchContext } from './contexts/search/search.context';
import { ProductsContext } from './contexts/products/products.context';
//types
import { Product } from './types/product.type';

export default function App() {
  const [searchString, setSearchString] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <SearchContext.Provider value={{ searchString, setSearchString }}>
      <ProductsContext.Provider value={{ products, setProducts }}>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Main />} />
            <Route path="about" element={<About />} />
            <Route path="form" element={<AddProduct />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </ProductsContext.Provider>
    </SearchContext.Provider>
  );
}
