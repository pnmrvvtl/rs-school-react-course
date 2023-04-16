//libs
import React from 'react';
//styles
import styles from './add-product.module.scss';
//components
import { ProductForm } from '../../components/index';
import { Card } from '../../components';
import { useAppSelector } from '../../store/store.redux';

export default function AddProduct() {
  const products = useAppSelector((state) => state.products.products);

  return (
    <div className={styles.container}>
      <ProductForm />
      <section className={styles.products}>
        {products.map((el, idx) => (
          <Card key={idx} product={el} />
        ))}
      </section>
    </div>
  );
}
