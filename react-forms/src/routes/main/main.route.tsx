//libs
import React, { useContext, useState } from 'react';
//styles
import styles from './main.module.scss';
//components
import { Card, Search } from '../../components';
//mock
import mockObjects from '../../data.json';
//contexts
import { SearchContext } from '../../contexts/search/search.context';

//types

export function Main() {
  const [products, setProducts] = useState(mockObjects);
  const { searchString } = useContext(SearchContext);
  const limit = 10;
  fetch(`https://dummyjson.com/products/search?q=${searchString}&limit=${limit}`)
    .then((res) => res.json())
    .then((res) => setProducts(res.products));

  return (
    <div className={styles.container}>
      <Search />
      <div className={styles.products}>
        {products.length ? (
          products.map((el) => <Card product={el} key={el.id} />)
        ) : (
          <h1>Sorry we dont have products that match your search. Please repeat search input.</h1>
        )}
      </div>
    </div>
  );
}

export default Main;
