//libs
import React from 'react';
import { Route, Routes } from 'react-router-dom';
//components
import { About, AddProduct, Error, Main, Navigation } from './routes';
//styles
import './styles/style.scss';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Main />} />
        <Route path="about" element={<About />} />
        <Route path="form" element={<AddProduct />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
