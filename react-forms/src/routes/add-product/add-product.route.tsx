//libs
import React, { Component } from 'react';
//styles
import styles from './add-product.module.scss';
//context
import { ProductsContext } from '../../contexts/products/products.context';
//components
import ProductForm from '../../components/form/product-form.component';
import { Card } from '../../components';

class AddProduct extends Component {
  render() {
    return (
      <div className={styles.container}>
        <ProductForm />
        <section className={styles.products}>
          <ProductsContext.Consumer>
            {({ products }) => products.map((el) => <Card key={el.id} product={el} />)}
          </ProductsContext.Consumer>
        </section>
      </div>
    );
  }
}

export default AddProduct;
