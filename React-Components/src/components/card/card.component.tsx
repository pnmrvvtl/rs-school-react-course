//libs
import React from 'react';
//types
import { Product } from '../../types/product.type';
//styles
import styles from './card.module.scss';

interface CardProps {
  product: Product;
}

export class Card extends React.Component<CardProps> {
  render() {
    const { title, brand, discountPercentage, images, category, price, rating } =
      this.props.product;
    return (
      <div className={styles.container}>
        <img className={styles['main-image']} src={images[0]} alt={`${title}`} />
        <div className={styles['small-images']}>
          <img width={50} height={50} src={images[1]} alt={`${title} sub-image 1`} />
          <img width={50} height={50} src={images[2]} alt={`${title} sub-image 2`} />
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
