import React from 'react';

import './App.css';
import Header from './components/UI/Button/Layout/Header';
import AddNewProduct from './components/AddNewProduct';
import ListOfProduct from './components/ListOfProducts';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
  return (
    <CartProvider>
    <Header/>
    {/* <Cart/> */}
   
    <AddNewProduct/>
    <ListOfProduct/>

    </CartProvider>
  );
}

export default App;
