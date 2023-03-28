//libs
import React, { useContext } from 'react';
//styles
import styles from './add-product.module.scss';
//context
import { ProductsContext } from '../../contexts/products/products.context';
//components
import { ProductForm } from '../../components/index';
import { Card } from '../../components';

export default function AddProduct() {
  const { products } = useContext(ProductsContext);

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
