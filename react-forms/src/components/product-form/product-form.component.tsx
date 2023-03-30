//libs
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//styles
import styles from './product-form.module.scss';
//contexts
import { ProductsContext } from '../../contexts/products/products.context';
//types
import { FormValues } from '../../types/form-values.type';
//components
import { InputSelect, InputText } from '../index';

const AddProductSchema = yup.object().shape({
  title: yup.string().required('Please input title'),
  price: yup
    .number()
    .required('Please input price')
    .typeError('Please input price, must be number'),
  rating: yup
    .number()
    .required('Please input rating')
    .typeError('Please input rating, must be number'),
  discount: yup
    .number()
    .required('Please input discount')
    .typeError('Please input discount, must be number'),
  producedAt: yup
    .date()
    .max(new Date(), 'Produce date must be today or earlier')
    .required('Please input produce date')
    .typeError('Please input produce date, must be a date'),
  category: yup.string().required('Please input category'),
  brand: yup.string().required('Please input brand'),
  state: yup.string().required('Please input state'),
  photo: yup
    .mixed()
    .test(
      'fileList',
      'Please upload an image of product',
      (value) => (value as FileList)?.length > 0
    ),
});

export default function ProductForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(AddProductSchema),
  });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { setProducts, products } = useContext(ProductsContext);

  function onSubmit(data: FormValues) {
    if (Object.keys(errors).length === 0) {
      const file = data.photo[0];
      if (file) {
        const reader = new FileReader();
        const state =
          data.state === 'refurbished' ? 'refurbished' : data.state === 'new' ? 'new' : 'used';
        reader.readAsDataURL(file);
        reader.onload = () => {
          const title = data.publish
            ? `${state} (${data.producedAt.toLocaleDateString()}) ${data.title}`
            : `${state} ${data.title}`;
          setProducts([
            ...products,
            {
              id: Math.random(),
              title,
              price: Number(data.price),
              rating: Number(data.rating),
              discountPercentage: Number(data.discount),
              category: data.category,
              brand: data.brand,
              images: [reader.result as string],
              description: '',
              stock: 1,
              thumbnail: '',
            },
          ]);
          reset();
          setIsConfirmed(true);
          setTimeout(() => setIsConfirmed(false), 7000);
        };
      }
    }
  }
  const BRANDS = ['Apple', 'Samsung', 'Xiaomi'];
  const CATEGORIES = ['Phone', 'Notebook', 'TV', 'Smart Watch'];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <InputText
        register={register}
        title={'Enter product title:'}
        error={errors.title?.message}
        name={'title'}
      />
      <InputText
        register={register}
        title={'Enter product price:'}
        error={errors.price?.message}
        name={'price'}
      />
      <InputText
        register={register}
        title={'Enter product rating:'}
        error={errors.rating?.message}
        name={'rating'}
      />
      <InputText
        register={register}
        title={'Enter product discount:'}
        error={errors.discount?.message}
        name={'discount'}
      />

      <div className={styles.input}>
        <label htmlFor="producedAtInput">
          Enter product produce date:{' '}
          <input {...register('producedAt')} type="date" id="producedAtInput" />
        </label>
        <div className={`${!errors.producedAt && styles.invisible} ${styles.error}`}>
          {errors.producedAt?.message}
        </div>
      </div>

      <InputSelect
        register={register}
        name={'category'}
        error={errors.category?.message}
        options={CATEGORIES}
      />
      <InputSelect
        register={register}
        name={'brand'}
        error={errors.brand?.message}
        options={BRANDS}
      />

      <div className={styles.input}>
        <label htmlFor="publishInput">
          Put produce date to the title of product:
          <input {...register('publish')} type="checkbox" id="publishInput" />
        </label>
        <div className={`${!errors.publish && styles.invisible} ${styles.error}`}>
          {errors.publish?.message}
        </div>
      </div>

      <div className={`${styles.input}  ${styles.radio}`}>
        <label>Was product in use:</label>
        <div>
          <label htmlFor="radioInput1">
            <input {...register('state')} type="radio" id="radioInput1" value="new" />
            No, is new product.
          </label>
        </div>
        <div>
          <label htmlFor="radioInput2">
            <input {...register('state')} type="radio" id="radioInput2" value="refurbished" />
            Yes, but product is refurbished.
          </label>
        </div>
        <div>
          <label htmlFor="radioInput3">
            <input {...register('state')} type="radio" id="radioInput3" value="used" />
            Yes, product was used.
          </label>
        </div>
        <div className={`${!errors.state && styles.invisible} ${styles.error}`}>
          {errors.state?.message}
        </div>
      </div>

      <div className={styles.input}>
        <label htmlFor="photoInput">
          Image of product:{' '}
          <input
            multiple={false}
            type="file"
            {...register('photo')}
            id="photoInput"
            accept="image/png, image/gif, image/jpeg, image/svg, image/jpg, image/ico"
          />
        </label>
        <div className={`${!errors.photo && styles.invisible} ${styles.error}`}>
          {errors.photo?.message}
        </div>
      </div>
      <button type="submit">Add Product</button>
      <h4 className={`${!isConfirmed && styles.invisible}`}>PRODUCT - ADDED, FORM - CLEARED.</h4>
    </form>
  );
}
