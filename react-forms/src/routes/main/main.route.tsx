//libs
import React, { useContext, useEffect, useState } from 'react';
//styles
import styles from './main.module.scss';
//components
import { Card, Search } from '../../components';
//contexts
import { SearchContext } from '../../contexts/search/search.context';
//api
import { ResultMeal } from '../../types/meal-api.type';

export function Main() {
  const [products, setProducts] = useState<ResultMeal[]>([]);
  const { searchString } = useContext(SearchContext);
  const limit = 10;

  useEffect(() => {
    // new MealsApi()
    //   .getMealsByParameters({
    //     query: searchString || 'a',
    //     type: ' main course, side dish, dessert, salad, bread, breakfast, soup',
    //     addRecipeInformation: true,
    //     number: limit,
    //     sort: 'random',
    //   })
    //   .then((res) => setProducts(res.results));
  }, [searchString]);

  return (
    <div className={styles.container}>
      <Search />
      <div className={styles.products}>
        {products.length ? (
          products.map((el) => (
            <Card
              product={{
                id: el.id,
                image: el.image,
                title: el.title,
                parameters: [
                  ['ready, minutes', el.readyInMinutes?.toString()],
                  ['price, $', el.pricePerServing?.toString()],
                  ['likes', el.aggregateLikes?.toString()],
                ],
              }}
              key={el.id}
            />
          ))
        ) : (
          <h1>Sorry we dont have products that match your search. Please repeat search input.</h1>
        )}
      </div>
    </div>
  );
}

export default Main;
