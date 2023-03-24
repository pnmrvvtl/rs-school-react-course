import { Product } from './product.type';

export interface AppState {
  searchString: string;
  products: Product[];
}

export interface SearchState {
  searchInputString: string;
}

export interface MainState {
  products: Product[];
}

export interface ErrorsType {
  priceInputError?: string;
  titleInputError?: string;
  discountInputError?: string;
  ratingInputError?: string;
  producedAtInputError?: string;
  brandInputError?: string;
  categoryInputError?: string;
  publishInputError?: string;
  wasInUseInputError?: string;
  photoInputError?: string;
}

export interface ProductFormState {
  errors: ErrorsType;
  isConfirmed: boolean;
}
