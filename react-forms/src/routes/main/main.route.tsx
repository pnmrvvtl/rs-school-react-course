//libs
import React, { useContext, useEffect, useRef, useState } from 'react';
//styles
import styles from './main.module.scss';
//components
import { Card, Search } from '../../components';
//contexts
import { SearchContext } from '../../contexts/search/search.context';
//api
import { ResultMeal } from '../../types/meal-api.type';
import Skeleton from '../../components/skeleton/skeleton.component';
import ReactDOM from 'react-dom';
import MealsApi from '../../api/meals.api';

export function Main() {
  const [products, setProducts] = useState<ResultMeal[] | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedProductData, setSelectedProductData] = useState<ResultMeal | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const { searchString } = useContext(SearchContext);
  const LIMIT_MEALS = 10;

  const handleCardClick = (id: number) => {
    setSelectedProductId(id);
  };

  const handleClosePopup = () => {
    setSelectedProductId(null);
  };

  const renderPopup = () => {
    if (selectedProductId) {
      return ReactDOM.createPortal(
        <div className={styles.popup} ref={popupRef} onClick={handleClosePopup}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={handleClosePopup}>
              Close
            </button>
            {selectedProductData ? (
              <>
                <h2>Product Details</h2>
                <img src={selectedProductData.image} alt="" height={200} width={200} />
                <p dangerouslySetInnerHTML={{ __html: selectedProductData?.summary }}></p>
              </>
            ) : (
              <h2> Loading </h2>
            )}
          </div>
        </div>,
        document.body
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        handleClosePopup();
      }
    };
    if (selectedProductId) {
      setSelectedProductData(null);
      document.addEventListener('mousedown', handleClickOutside);
      new MealsApi().getMealById(selectedProductId).then((res) => setSelectedProductData(res));
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedProductId]);

  useEffect(() => {
    setProducts(null);
    new MealsApi()
      .getMealsByParameters({
        query: searchString ? searchString : 'a',
        type: 'main course, side dish, dessert, salad, bread, breakfast, soup',
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
