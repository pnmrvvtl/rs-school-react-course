//libs
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
//styles
import styles from './main.module.scss';
//components
import { Card, Popup, Search, Skeleton } from '../../components';
//redux
import { useAppSelector } from '../../store/store.redux';
import { useGetMealByIdQuery, useGetMealsByParametersQuery } from '../../api/meals.rtk-api';
import { ResultMeal } from '../../types/meal-api.type';

export function Main() {
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedProductData, setSelectedProductData] = useState<ResultMeal | null>(null);

  const searchString = useAppSelector((state) => state.search.query);
  const { isLoading, data } = useGetMealsByParametersQuery({
    query: searchString ? searchString : 'a',
    type: 'main course,side dish,dessert,salad,bread,breakfast,soup',
    addRecipeInformation: true,
    number: 10,
    sort: 'rating',
  });
  const { data: fetchedProductData } = useGetMealByIdQuery(selectedProductId ?? 0, {
    skip: selectedProductId === null,
  });

  const products = data ? data.results : [];
  const LIMIT_MEALS = 10;

  const handleCardClick = (id: number) => {
    if (isPopupOpened || selectedProductId) {
      handleClosePopup();
    } else {
      if (fetchedProductData && id === fetchedProductData.id) {
        setSelectedProductData(fetchedProductData);
      }
      setSelectedProductId(id);
      setIsPopupOpened(true);
    }
  };

  const handleClosePopup = () => {
    setSelectedProductData(null);
    setSelectedProductId(null);
    setIsPopupOpened(false);
  };

  const renderPopup = () => {
    if (isPopupOpened) {
      window.scrollTo(0, 0);
      return ReactDOM.createPortal(
        <Popup
          onCloseButtonClick={handleClosePopup}
          onPopupClick={handleClosePopup}
          selectedProductData={selectedProductData}
        />,
        document.body
      );
    }
  };

  useEffect(() => {}, [selectedProductId]);

  useEffect(() => {}, [searchString]);

  useEffect(
    () => fetchedProductData && setSelectedProductData(fetchedProductData),
    [fetchedProductData]
  );

  return (
    <div className={styles.container}>
      <Search />
      {isLoading && <h1 style={{ textAlign: 'center' }}>Loading...</h1>}
      <div className={styles.products}>
        {isLoading ? (
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
