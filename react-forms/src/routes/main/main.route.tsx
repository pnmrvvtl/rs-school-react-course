//libs
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
//styles
import styles from './main.module.scss';
//components
import { Card, Popup, Search, Skeleton } from '../../components';
//redux
import { useAppSelector } from '../../store/store.redux';
import { useGetMealByIdQuery, useGetMealsByParametersQuery } from '../../store/api/meals.api';

export function Main() {
  const LIMIT_MEALS = 10;

  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const searchString = useAppSelector((state) => state.search.query);
  const { isFetching, data } = useGetMealsByParametersQuery({
    query: searchString ? searchString : 'a',
    type: 'main course,side dish,dessert,salad,bread,breakfast,soup',
    addRecipeInformation: true,
    number: LIMIT_MEALS,
    sort: 'rating',
  });
  const products = data ? data.results : [];

  const { data: fetchedProductData, isFetching: isPopFetching } = useGetMealByIdQuery(
    selectedProductId ?? 0,
    {
      skip: selectedProductId === null,
    }
  );

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
  };

  const renderPopup = () => {
    if (isPopupOpened) {
      scrollTo(0, 0);
      return ReactDOM.createPortal(
        <Popup
          onCloseButtonClick={handleClosePopup}
          onPopupClick={handleClosePopup}
          selectedProductData={
            isPopFetching ? null : fetchedProductData ? fetchedProductData : null
          }
        />,
        document.body
      );
    }
  };

  useEffect(() => {}, [selectedProductId]);

  useEffect(() => {}, [searchString]);

  return (
    <div className={styles.container}>
      <Search />
      {isFetching && <h1 style={{ textAlign: 'center' }}>Loading...</h1>}
      <div className={styles.products}>
        {isFetching ? (
          Array.from({ length: LIMIT_MEALS }, (v, i) => i).map((el) => (
            <Skeleton key={el}></Skeleton>
          ))
        ) : products?.length ? (
          products.map((el) => (
            <Card
              product={{
                id: el.id,
                image: el.image,
                title: el.title,
                parameters: [
                  ['ready, minutes', el.readyInMinutes!.toString()],
                  ['price, $', el.pricePerServing!.toString()],
                  ['likes', el.aggregateLikes!.toString()],
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
