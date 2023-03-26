//libs
import React, { createRef, RefObject } from 'react';
//styles
import styles from './product-form.module.scss';
//contexts
import { ProductsContext } from '../../contexts/products/products.context';
//types
import { ProductFormState } from '../../types/states.type';
//components
import { InputSelect, InputText } from '../index';

class ProductForm extends React.Component<object, ProductFormState> {
  private readonly priceInput: RefObject<HTMLInputElement>;
  private readonly discountInput: RefObject<HTMLInputElement>;
  private readonly titleInput: RefObject<HTMLInputElement>;
  private readonly ratingInput: RefObject<HTMLInputElement>;
  private readonly producedAtInput: RefObject<HTMLInputElement>;
  private readonly brandInput: RefObject<HTMLSelectElement>;
  private readonly categoryInput: RefObject<HTMLSelectElement>;
  private readonly publishInput: RefObject<HTMLInputElement>;
  private readonly newInput: RefObject<HTMLInputElement>;
  private readonly refurbishedInput: RefObject<HTMLInputElement>;
  private readonly usedInput: RefObject<HTMLInputElement>;
  private readonly photoInput: RefObject<HTMLInputElement>;

  static contextType = ProductsContext;
  declare context: React.ContextType<typeof ProductsContext>;

  constructor(props: object) {
    super(props);
    this.state = {
      errors: {},
      isConfirmed: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.priceInput = createRef<HTMLInputElement>();
    this.titleInput = createRef<HTMLInputElement>();
    this.ratingInput = createRef<HTMLInputElement>();
    this.producedAtInput = createRef<HTMLInputElement>();
    this.brandInput = createRef<HTMLSelectElement>();
    this.categoryInput = createRef<HTMLSelectElement>();
    this.publishInput = createRef<HTMLInputElement>();
    this.newInput = createRef<HTMLInputElement>();
    this.refurbishedInput = createRef<HTMLInputElement>();
    this.usedInput = createRef<HTMLInputElement>();
    this.photoInput = createRef<HTMLInputElement>();
    this.discountInput = createRef<HTMLInputElement>();
  }

  clearForm() {
    this.setState({ errors: {} });
    this.priceInput.current!.value = '';
    this.titleInput.current!.value = '';
    this.discountInput.current!.value = '';
    this.ratingInput.current!.value = '';
    this.producedAtInput.current!.value = '';
    this.brandInput.current!.value = '';
    this.categoryInput.current!.value = '';
    this.publishInput.current!.checked = false;
    this.newInput.current!.checked = false;
    this.refurbishedInput.current!.checked = false;
    this.usedInput.current!.checked = false;
    this.photoInput.current!.value = '';
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors: ProductFormState['errors'] = {};

    !this.titleInput.current?.value && (errors.titleInputError = 'Please enter title');

    (!this.priceInput.current?.value || isNaN(Number(this.priceInput.current?.value))) &&
      (errors.priceInputError = 'Please enter correct price, must be number');

    (!this.discountInput.current?.value || isNaN(Number(this.discountInput.current?.value))) &&
      (errors.discountInputError = 'Please enter correct discount, must be number');

    (!this.ratingInput.current?.value || isNaN(Number(this.ratingInput.current?.value))) &&
      (errors.ratingInputError = 'Please enter correct rating, must be number');

    (!this.producedAtInput.current?.value ||
      new Date(this.producedAtInput.current?.value).valueOf() > Date.now()) &&
      (errors.producedAtInputError = 'Please enter a produce date, must be today of earlier');

    !this.newInput.current?.checked &&
      !this.usedInput.current?.checked &&
      !this.refurbishedInput.current?.checked &&
      (errors.wasInUseInputError = 'Please select state of product');

    !this.brandInput.current?.value && (errors.brandInputError = 'Please select a brand');

    !this.categoryInput.current?.value && (errors.categoryInputError = 'Please select a category');

    !this.photoInput.current?.files?.[0] &&
      (errors.photoInputError = 'Please upload an image file of product');

    if (Object.keys(errors).length === 0) {
      //submit form
      const file = this.photoInput.current?.files?.[0];
      if (file) {
        const reader = new FileReader();
        const state = this.refurbishedInput.current?.checked
          ? 'refurbished'
          : this.newInput.current?.checked
          ? 'new'
          : 'used';
        reader.readAsDataURL(file);
        reader.onload = () => {
          const title = this.publishInput.current?.checked
            ? `${state} (${this.producedAtInput.current?.value}) ${this.titleInput.current!.value}`
            : `${state} ${this.titleInput.current!.value}`;
          this.context.setProducts([
            ...this.context.products,
            {
              id: Math.random(),
              title,
              price: Number(this.priceInput.current!.value),
              rating: Number(this.ratingInput.current!.value),
              discountPercentage: Number(this.discountInput.current!.value),
              category: this.categoryInput.current!.value,
              brand: this.brandInput.current!.value,
              images: [reader.result as string],
              description: '',
              stock: 1,
              thumbnail: '',
            },
          ]);
          this.clearForm();
          this.setState({ errors, isConfirmed: true });
          setTimeout(() => this.setState({ errors, isConfirmed: false }), 7000);
        };
      }
    } else {
      this.setState({ errors });
    }
  }

  render() {
    const { errors } = this.state;
    const BRANDS = ['Apple', 'Samsung', 'Xiaomi'];
    const CATEGORIES = ['Phone', 'Notebook', 'TV', 'Smart Watch'];

    return (
      <form onSubmit={this.handleSubmit} className={styles.container}>
        <InputText
          title={'Enter product title:'}
          myRef={this.titleInput}
          error={errors.titleInputError}
          name={'title'}
        />
        <InputText
          title={'Enter product price:'}
          myRef={this.priceInput}
          error={errors.priceInputError}
          name={'price'}
        />
        <InputText
          title={'Enter product rating:'}
          myRef={this.ratingInput}
          error={errors.ratingInputError}
          name={'rating'}
        />
        <InputText
          title={'Enter product discount:'}
          myRef={this.discountInput}
          error={errors.discountInputError}
          name={'discount'}
        />

        <div className={styles.input}>
          <label htmlFor="producedAtInput">
            Enter product produce date:{' '}
            <input type="date" id="producedAtInput" ref={this.producedAtInput} />
          </label>
          <div className={`${!errors.producedAtInputError && styles.invisible} ${styles.error}`}>
            {errors.producedAtInputError}
          </div>
        </div>

        <InputSelect
          name={'category'}
          myRef={this.categoryInput}
          error={this.state.errors.categoryInputError}
          options={CATEGORIES}
        />
        <InputSelect
          name={'brand'}
          myRef={this.brandInput}
          error={this.state.errors.brandInputError}
          options={BRANDS}
        />

        <div className={styles.input}>
          <label htmlFor="publishInput">
            Put produce date to the title of product:
            <input type="checkbox" id="publishInput" ref={this.publishInput} />
          </label>
          <div className={`${!errors.publishInputError && styles.invisible} ${styles.error}`}>
            {errors.publishInputError}
          </div>
        </div>

        <div className={`${styles.input}  ${styles.radio}`}>
          <label>Was this product in use:</label>
          <div>
            <label htmlFor="radioInput1">
              <input
                type="radio"
                id="radioInput1"
                name="radioInput"
                ref={this.newInput}
                value="new"
              />
              No, this is new product.
            </label>
          </div>
          <div>
            <label htmlFor="radioInput2">
              <input
                type="radio"
                id="radioInput2"
                name="radioInput"
                ref={this.refurbishedInput}
                value="refurbished"
              />
              Yes, but this product is refurbished.
            </label>
          </div>
          <div>
            <label htmlFor="radioInput3">
              <input
                type="radio"
                id="radioInput3"
                name="radioInput"
                ref={this.usedInput}
                value="used"
              />
              Yes, this product was used.
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
              ref={this.photoInput}
              accept="image/png, image/gif, image/jpeg, image/svg, image/jpg, image/ico"
            />
          </label>
          <div className={`${!errors.photoInputError && styles.invisible} ${styles.error}`}>
            {errors.photoInputError}
          </div>
        </div>
        <button type="submit">Add Product</button>
        <h4 className={`${!this.state.isConfirmed && styles.invisible}`}>
          PRODUCT - ADDED, FORM - CLEARED.
        </h4>
      </form>
    );
  }
}

export default ProductForm;
