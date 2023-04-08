//libs
import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
//styles
import styles from './main.module.scss';
//components
import { Card, Popup, Search, Skeleton } from '../../components';
//contexts
import { SearchContext } from '../../contexts/search/search.context';
//api
import MealsApi from '../../api/meals.api';
//types
import { ResultMeal } from '../../types/meal-api.type';

export function Main() {
  const [products, setProducts] = useState<ResultMeal[] | null>(null);
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedProductData, setSelectedProductData] = useState<ResultMeal | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const { searchString } = useContext(SearchContext);

  const LIMIT_MEALS = 10;

  const handleCardClick = (id: number) => {
    if (isPopupOpened || selectedProductId) {
      handleClosePopup();
    } else {
      setSelectedProductId(id);
      setIsPopupOpened(true);
    }
  };

  const handleClosePopup = () => {
    setSelectedProductId(null);
    setIsPopupOpened(false);
    setSelectedProductData(null);
  };

  const renderPopup = () => {
    if (isPopupOpened) {
      window.scrollTo(0, 0);
      return ReactDOM.createPortal(
        <Popup
          ref={popupRef}
          onCloseButtonClick={handleClosePopup}
          onPopupClick={handleClosePopup}
          selectedProductData={selectedProductData}
        />,
        document.body
      );
    }
  };

  useEffect(() => {
    if (selectedProductId) {
      setSelectedProductData(null);
      new MealsApi().getMealById(selectedProductId).then((res) => setSelectedProductData(res));
    }
  }, [selectedProductId]);

  useEffect(() => {
    setProducts(null);
    new MealsApi()
      .getMealsByParameters({
        query: searchString ? searchString : 'a',
        type: 'main course,side dish,dessert,salad,bread,breakfast,soup',
        addRecipeInformation: true,
        number: LIMIT_MEALS,
        sort: 'random',
      })
      .then((res) => setProducts(res.results));
  }, [searchString]);

  return (
    <div className={styles.container}>
      <Search />
      {products === null && <h1 style={{ textAlign: 'center' }}>Loading...</h1>}
      <div className={styles.products}>
        {products === null ? (
          Array.from({ length: LIMIT_MEALS }, (v, i) => i).map((el) => (
            <Skeleton key={el}></Skeleton>
          ))
        ) : products.length ? (
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
                  ['vegetarian', el.vegetarian ? 'yes' : 'no'],
                ],
              }}
              key={el.id}
              onClick={() => handleCardClick(el.id)}
            />
          ))
        ) : (
          <h1>Sorry we dont have products that match your search. Please repeat search input.</h1>
        )}
      </div>
      {renderPopup()}
    </div>
  );
}

export default Main;
