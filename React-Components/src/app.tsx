//libs
import React, { SetStateAction } from 'react';
import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
//components
import { Main, Navigation, About, Error } from './routes';
//styles
import './styles/style.scss';
//context
import { SearchContext } from './contexts/search.context';

interface AppState {
  searchString: string;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Navigation />}
      errorElement={
        <Navigation>
          <Error />
        </Navigation>
      }
    >
      <Route index element={<Main />} />
      <Route path="about" element={<About />} />
    </Route>
  )
);

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
        <RouterProvider router={router} />;
      </SearchContext.Provider>
    );
  }
}
