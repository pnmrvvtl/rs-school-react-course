//styles
import styles from './add-product.module.scss';

import React, { Component } from 'react';
import ProductForm from '../../components/form/product-form.component';

class AddProduct extends Component {
  render() {
    return (
      <div className={styles.container}>
        Add product
        <ProductForm />
      </div>
    );
  }
}

export default AddProduct;
