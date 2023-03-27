//libs
import React, { SetStateAction } from 'react';
import { Route, Routes } from 'react-router-dom';
//components
import { About, AddProduct, Error, Main, Navigation } from './routes';
//styles
import './styles/style.scss';
//context
import { SearchContext } from './contexts/search/search.context';
import { ProductsContext } from './contexts/products/products.context';
//types
import { AppState } from './types/states.type';
import { Product } from './types/product.type';

export default class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchString: '',
      products: [],
    };
    this.setSearchString = this.setSearchString.bind(this);
    this.setProducts = this.setProducts.bind(this);
  }

  setProducts(products: SetStateAction<Product[]>) {
    this.setState((prevState) => ({
      products: typeof products === 'function' ? products(prevState.products) : products,
      searchString: prevState.searchString,
    }));
  }

  setSearchString(searchString: SetStateAction<string>) {
    this.setState((prevState) => ({
      searchString:
        typeof searchString === 'function' ? searchString(prevState.searchString) : searchString,
      products: prevState.products,
    }));
  }

  render() {
    const { searchString, products } = this.state;
    return (
      <SearchContext.Provider value={{ searchString, setSearchString: this.setSearchString }}>
        <ProductsContext.Provider value={{ products, setProducts: this.setProducts }}>
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
}
