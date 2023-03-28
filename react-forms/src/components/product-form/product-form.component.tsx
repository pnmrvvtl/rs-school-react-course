//libs
import React, { useContext, useRef, useState } from 'react';
//styles
import styles from './product-form.module.scss';
//contexts
import { ProductsContext } from '../../contexts/products/products.context';
//types
import { ErrorsType } from '../../types/states.type';
//components
import { InputSelect, InputText } from '../index';

export default function ProductForm() {
  const [errors, setErrors] = useState<ErrorsType>({});
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { setProducts, products } = useContext(ProductsContext);

  const formRef = useRef<HTMLFormElement>(null);
  const priceInput = useRef<HTMLInputElement>(null);
  const discountInput = useRef<HTMLInputElement>(null);
  const titleInput = useRef<HTMLInputElement>(null);
  const ratingInput = useRef<HTMLInputElement>(null);
  const producedAtInput = useRef<HTMLInputElement>(null);
  const brandInput = useRef<HTMLSelectElement>(null);
  const categoryInput = useRef<HTMLSelectElement>(null);
  const publishInput = useRef<HTMLInputElement>(null);
  const newInput = useRef<HTMLInputElement>(null);
  const refurbishedInput = useRef<HTMLInputElement>(null);
  const usedInput = useRef<HTMLInputElement>(null);
  const photoInput = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors: ErrorsType = {};

    !titleInput.current?.value && (errors.titleInputError = 'Please enter title');

    (!priceInput.current?.value || isNaN(Number(priceInput.current?.value))) &&
      (errors.priceInputError = 'Please enter correct price, must be number');

    (!discountInput.current?.value || isNaN(Number(discountInput.current?.value))) &&
      (errors.discountInputError = 'Please enter correct discount, must be number');

    (!ratingInput.current?.value || isNaN(Number(ratingInput.current?.value))) &&
      (errors.ratingInputError = 'Please enter correct rating, must be number');

    (!producedAtInput.current?.value ||
      new Date(producedAtInput.current?.value).valueOf() > Date.now()) &&
      (errors.producedAtInputError = 'Please enter a produce date, must be today of earlier');

    !newInput.current?.checked &&
      !usedInput.current?.checked &&
      !refurbishedInput.current?.checked &&
      (errors.wasInUseInputError = 'Please select state of product');

    !brandInput.current?.value && (errors.brandInputError = 'Please select a brand');

    !categoryInput.current?.value && (errors.categoryInputError = 'Please select a category');

    !photoInput.current?.files?.[0] &&
      (errors.photoInputError = 'Please upload an image file of product');

    if (Object.keys(errors).length === 0) {
      //submit form
      const file = photoInput.current?.files?.[0];
      if (file) {
        const reader = new FileReader();
        const state = refurbishedInput.current?.checked
          ? 'refurbished'
          : newInput.current?.checked
          ? 'new'
          : 'used';
        reader.readAsDataURL(file);
        reader.onload = () => {
          const title = publishInput.current?.checked
            ? `${state} (${producedAtInput.current?.value}) ${titleInput.current!.value}`
            : `${state} ${titleInput.current!.value}`;
          setProducts([
            ...products,
            {
              id: Math.random(),
              title,
              price: Number(priceInput.current!.value),
              rating: Number(ratingInput.current!.value),
              discountPercentage: Number(discountInput.current!.value),
              category: categoryInput.current!.value,
              brand: brandInput.current!.value,
              images: [reader.result as string],
              description: '',
              stock: 1,
              thumbnail: '',
            },
          ]);
          formRef.current?.reset();
          setIsConfirmed(true);
          setErrors({});
          setTimeout(() => setIsConfirmed(false), 7000);
        };
      }
    } else {
      setErrors({ ...errors });
    }
  }
  const BRANDS = ['Apple', 'Samsung', 'Xiaomi'];
  const CATEGORIES = ['Phone', 'Notebook', 'TV', 'Smart Watch'];

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.container}>
      <InputText
        title={'Enter product title:'}
        myRef={titleInput}
        error={errors.titleInputError}
        name={'title'}
      />
      <InputText
        title={'Enter product price:'}
        myRef={priceInput}
        error={errors.priceInputError}
        name={'price'}
      />
      <InputText
        title={'Enter product rating:'}
        myRef={ratingInput}
        error={errors.ratingInputError}
        name={'rating'}
      />
      <InputText
        title={'Enter product discount:'}
        myRef={discountInput}
        error={errors.discountInputError}
        name={'discount'}
      />

      <div className={styles.input}>
        <label htmlFor="producedAtInput">
          Enter product produce date:{' '}
          <input type="date" id="producedAtInput" ref={producedAtInput} />
        </label>
        <div className={`${!errors.producedAtInputError && styles.invisible} ${styles.error}`}>
          {errors.producedAtInputError}
        </div>
      </div>

      <InputSelect
        name={'category'}
        myRef={categoryInput}
        error={errors.categoryInputError}
        options={CATEGORIES}
      />
      <InputSelect
        name={'brand'}
        myRef={brandInput}
        error={errors.brandInputError}
        options={BRANDS}
      />

      <div className={styles.input}>
        <label htmlFor="publishInput">
          Put produce date to the title of product:
          <input type="checkbox" id="publishInput" ref={publishInput} />
        </label>
        <div className={`${!errors.publishInputError && styles.invisible} ${styles.error}`}>
          {errors.publishInputError}
        </div>
      </div>

      <div className={`${styles.input}  ${styles.radio}`}>
        <label>Was product in use:</label>
        <div>
          <label htmlFor="radioInput1">
            <input type="radio" id="radioInput1" name="radioInput" ref={newInput} value="new" />
            No, is new product.
          </label>
        </div>
        <div>
          <label htmlFor="radioInput2">
            <input
              type="radio"
              id="radioInput2"
              name="radioInput"
              ref={refurbishedInput}
              value="refurbished"
            />
            Yes, but product is refurbished.
          </label>
        </div>
        <div>
          <label htmlFor="radioInput3">
            <input type="radio" id="radioInput3" name="radioInput" ref={usedInput} value="used" />
            Yes, product was used.
          </label>
        </div>

        <div className={`${!errors.wasInUseInputError && styles.invisible} ${styles.error}`}>
          {errors.wasInUseInputError}
        </div>
      </div>

      <div className={styles.input}>
        <label htmlFor="photoInput">
          Image of product:{' '}
          <input
            type="file"
            id="photoInput"
            ref={photoInput}
            accept="image/png, image/gif, image/jpeg, image/svg, image/jpg, image/ico"
          />
        </label>
        <div className={`${!errors.photoInputError && styles.invisible} ${styles.error}`}>
          {errors.photoInputError}
        </div>
      </div>
      <button type="submit">Add Product</button>
      <h4 className={`${!isConfirmed && styles.invisible}`}>PRODUCT - ADDED, FORM - CLEARED.</h4>
    </form>
  );
}
