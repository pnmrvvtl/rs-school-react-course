import { Product } from './product.type';

export interface AppState {
  searchString: string;
}

export interface SearchState {
  searchInputString: string;
}

export interface MainState {
  products: Product[];
}
