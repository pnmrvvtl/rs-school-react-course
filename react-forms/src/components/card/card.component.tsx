//libs
import React from 'react';
//types
import { CardProps } from '../../types/propses.type';
//styles
import styles from './card.module.scss';

export class Card extends React.Component<CardProps> {
  render() {
    const { title, brand, discountPercentage, images, category, price, rating } =
      this.props.product;
    return (
      <div className={styles.container}>
        <img className={styles['main-image']} src={images[0]} alt={`${title}`} />
        <div className={styles['buttons']}>
          <input type={'button'} className={styles['buy-button']} value={'BUY NOW'} />
          <input type={'button'} className={styles['add-button']} value={'ADD TO CART'} />
        </div>
        <div className={styles.title}>
          <h4>{title}</h4>
          <p>
            <span>Price:</span> {price}
          </p>
          <p>
            <span>Rating:</span> {rating}
          </p>
          <p>
            <span>Brand:</span> {brand}
          </p>
          <p>
            <span>Category:</span> {category}
          </p>
          <p>
            <span>Discount:</span> {discountPercentage}
          </p>
        </div>
      </div>
    );
  }
}

export default Card;
