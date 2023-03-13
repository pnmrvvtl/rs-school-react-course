import React, { Component } from 'react';
import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Main, Navigation, About, Error } from './routes';

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

export default class App extends Component {
  render() {
    return <RouterProvider router={router} />;
  }
}
