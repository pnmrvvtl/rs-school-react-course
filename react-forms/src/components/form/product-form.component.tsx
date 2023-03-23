//libs
import React, { createRef, RefObject } from 'react';
//styles
import styles from './product-form.module.scss';
//contexts
import { ProductsContext } from '../../contexts/products/products.context';
//types
import { ProductFormState } from '../../types/states.type';

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
    this.ratingInput.current!.value = '';
    this.producedAtInput.current!.value = '';
    this.brandInput.current!.value = '';
    this.categoryInput.current!.value = '';
    this.publishInput.current!.value = '';
    this.newInput.current!.checked = true;
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
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.context.setProducts([
            ...this.context.products,
            {
              id: Math.random(),
              title: this.titleInput.current!.value,
              price: Number(this.priceInput.current!.value),
              rating: Number(this.ratingInput.current!.value),
              discountPercentage: Number(this.discountInput.current!.value),
              category: this.categoryInput.current!.value,
              brand: this.categoryInput.current!.value,
              images: [reader.result as string],
              description: '',
              stock: 1,
              thumbnail: '',
            },
          ]);
          this.clearForm();
          this.setState({ errors, isConfirmed: true });
          setTimeout(() => this.setState({ errors, isConfirmed: false }), 2000);
        };
      }
    } else {
      this.setState({ errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={styles.container}>
        <div className={styles.input}>
          <label htmlFor="titleInput">
            Enter product title: <input type="text" id="titleInput" ref={this.titleInput} />
          </label>
          <div className={`${!errors.titleInputError && styles.invisible} ${styles.error}`}>
            {errors.titleInputError}
          </div>
        </div>

        <div className={styles.input}>
          <label htmlFor="priceInput">
            Enter product price:
            <input type="text" id="priceInput" ref={this.priceInput} />
          </label>
          <div className={`${!errors.priceInputError && styles.invisible} ${styles.error}`}>
            {errors.priceInputError}
          </div>
        </div>

        <div className={styles.input}>
          <label htmlFor="ratingInput">
            Enter product rating: <input type="text" id="ratingInput" ref={this.ratingInput} />
          </label>
          <div className={`${!errors.ratingInputError && styles.invisible} ${styles.error}`}>
            {errors.ratingInputError}
          </div>
        </div>

        <div className={styles.input}>
          <label htmlFor="discountInput">
            Enter product discount:{' '}
            <input type="text" id="discountInput" ref={this.discountInput} />
          </label>
          <div className={`${!errors.discountInputError && styles.invisible} ${styles.error}`}>
            {errors.discountInputError}
          </div>
        </div>

        <div className={styles.input}>
          <label htmlFor="producedAtInput">
            Enter product produce date:{' '}
            <input type="date" id="producedAtInput" ref={this.producedAtInput} />
          </label>
          <div className={`${!errors.producedAtInputError && styles.invisible} ${styles.error}`}>
            {errors.producedAtInputError}
          </div>
        </div>

        <div className={styles.input}>
          <label htmlFor="categoryInput">
            Select category:
            <select id="categoryInput" ref={this.categoryInput}>
              <option value="">--Please choose an option--</option>
              <option value="Phone">Phone</option>
              <option value="Tablet">Tablet</option>
              <option value="Notebook">Notebook</option>
            </select>
          </label>
          <div className={`${!errors.categoryInputError && styles.invisible} ${styles.error}`}>
            {errors.categoryInputError}
          </div>
        </div>

        <div className={styles.input}>
          <label htmlFor="brandInput">
            Select brand:
            <select id="brandInput" ref={this.brandInput}>
              <option value="">--Please choose an option--</option>
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
              <option value="Xiaomi">Xiaomi</option>
            </select>
          </label>
          <div className={`${!errors.brandInputError && styles.invisible} ${styles.error}`}>
            {errors.brandInputError}
          </div>
        </div>

        <div className={styles.input}>
          <label htmlFor="publishInput">
            Publish this product to site:{' '}
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
                defaultChecked
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
            File Input: <input type="file" id="photoInput" ref={this.photoInput} />
          </label>
          <div className={`${!errors.photoInputError && styles.invisible} ${styles.error}`}>
            {errors.photoInputError}
          </div>
        </div>
        <button type="submit">Add Product</button>
        <span className={`${!this.state.isConfirmed && styles.invisible}`}>
          Your product is added and form is cleared.
        </span>
      </form>
    );
  }
}

export default ProductForm;
