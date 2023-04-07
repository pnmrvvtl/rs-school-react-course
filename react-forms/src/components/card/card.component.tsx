//libs
import React from 'react';
//types
import { CardProps } from '../../types/propses.type';
//styles
import styles from './card.module.scss';

export function Card(props: CardProps) {
  const { title, image, parameters } = props.product;
  return (
    <div className={styles.container} onClick={props.onClick}>
      <img className={styles['main-image']} src={image} alt={`${title}`} />
      <div className={styles['buttons']}>
        <input type={'button'} className={styles['buy-button']} value={'BUY NOW'} />
        <input type={'button'} className={styles['add-button']} value={'ADD TO CART'} />
      </div>
      <div className={styles.title}>
        <h4>{title}</h4>
        {parameters.map((el) => (
          <p key={el.toString()}>
            <span>{el[0]}</span> {el[1]}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Card;
