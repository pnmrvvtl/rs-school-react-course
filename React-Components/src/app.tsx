//libs
import React, { SetStateAction } from 'react';
import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
  RouterProvider,
  Routes,
  BrowserRouter,
} from 'react-router-dom';
//components
import { Main, Navigation, About, Error } from './routes';
//styles
import './styles/style.scss';
//context
import { SearchContext } from './contexts/search/search.context';

interface AppState {
  searchString: string;
}

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
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </SearchContext.Provider>
    );
  }
}
