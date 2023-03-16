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
import { SearchContext } from './contexts/search/search.context';
import { PathContext } from './contexts/path/path.context';

interface AppState {
  searchString: string;
  path: string;
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
      path: '',
    };
    this.setSearchString = this.setSearchString.bind(this);
    this.setPath = this.setPath.bind(this);
  }

  setSearchString(searchString: SetStateAction<string>) {
    this.setState((prevState) => ({
      searchString:
        typeof searchString === 'function' ? searchString(prevState.searchString) : searchString,
    }));
  }

  setPath(path: SetStateAction<string>) {
    this.setState((prevState) => ({
      searchString: typeof path === 'function' ? path(prevState.path) : path,
    }));
  }

  render() {
    const { searchString, path } = this.state;
    return (
      <SearchContext.Provider value={{ searchString, setSearchString: this.setSearchString }}>
        <PathContext.Provider value={{ path, setPath: this.setPath }}>
          <RouterProvider router={router} />;
        </PathContext.Provider>
      </SearchContext.Provider>
    );
  }
}
