//libs
import React from 'react';
//styles
import styles from './main.module.scss';
//components
import { Card, Search } from '../../components';
//mock
import mockObjects from '../../data.json';
//contexts
import { SearchContext } from '../../contexts/search/search.context';
import { Product } from '../../types/product.type';

interface MainState {
  products: Product[];
}

export class Main extends React.Component<object, MainState> {
  constructor(props: object) {
    super(props);
    this.state = { products: mockObjects };
  }

  render() {
    const limit = 10;

    return (
      <div className={styles.container}>
        <Search />
        <SearchContext.Consumer>
          {({ searchString }) => {
            fetch(`https://dummyjson.com/products/search?q=${searchString}&limit=${limit}`)
              .then((res) => res.json())
              .then((res) => this.setState({ products: res.products }));
            return false;
          }}
        </SearchContext.Consumer>
        <div className={styles.products}>
          {this.state.products.length ? (
            this.state.products.map((el) => <Card product={el} key={el.id} />)
          ) : (
            <h1>Sorry we dont have products that match your search. Please repeat search input.</h1>
          )}
        </div>
      </div>
    );
  }
}

export default Main;
