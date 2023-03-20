//libs
import React, { SetStateAction } from 'react';
import { Route, Routes } from 'react-router-dom';
//components
import { About, Error, Main, Navigation } from './routes';
//styles
import './styles/style.scss';
//context
import { SearchContext } from './contexts/search/search.context';
//types
import { AppState } from './types/states.type';
import AddProduct from './routes/add-product/add-product.route';

export default class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchString: '',
    };
    this.setSearchString = this.setSearchString.bind(this);
  }

  setSearchString(searchString: SetStateAction<string>) {
    this.setState((prevState) => ({
      searchString:
        typeof searchString === 'function' ? searchString(prevState.searchString) : searchString,
    }));
  }

  render() {
    const { searchString } = this.state;
    return (
      <SearchContext.Provider value={{ searchString, setSearchString: this.setSearchString }}>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Main />} />
            <Route path="about" element={<About />} />
            <Route path="form" element={<AddProduct />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </SearchContext.Provider>
    );
  }
}
