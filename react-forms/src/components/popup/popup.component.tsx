//libs
import React, { MouseEventHandler } from 'react';
//types
import { ResultMeal } from '../../types/meal-api.type';
//styles
import styles from './popup.module.scss';

export default function Popup(props: {
  ref: React.RefObject<HTMLDivElement>;
  onCloseButtonClick: MouseEventHandler<HTMLButtonElement>;
  onPopupClick: MouseEventHandler<HTMLDivElement>;
  selectedProductData: ResultMeal | null;
}) {
  const body = document.body,
    html = document.documentElement;

  return (
    <div
      className={styles.popup}
      ref={props.ref}
      onClick={props.onPopupClick}
      style={{
        height: `${Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        )}px`,
      }}
    >
      <div className={styles['popup-content']} onClick={(e) => e.stopPropagation()}>
        <button className={styles['close-button']} onClick={props.onCloseButtonClick}>
          X
        </button>
        {props.selectedProductData ? (
          <>
            <h2>Product Details</h2>
            <img src={props.selectedProductData.image} alt={props.selectedProductData.title} />
            <p dangerouslySetInnerHTML={{ __html: props.selectedProductData?.summary }}></p>
            <hr />
            <p>
              <strong>INGREDIENTS:</strong>
              {props.selectedProductData.extendedIngredients.map((el) => (
                <p key={el.id}>
                  {el.name.toUpperCase()}, {el.amount}
                </p>
              ))}
            </p>
          </>
        ) : (
          <h2> Loading... </h2>
        )}
      </div>
    </div>
  );
}
