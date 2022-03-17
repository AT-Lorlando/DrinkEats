import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './App.css';
import Cart from './components/cart.js';
import Soup, {soup} from './components/soup.js';

const Soups = []

new soup('Soupe au chou', Soups) 
new soup('Soupe Miso', Soups) 
new soup('Soupe champignon', Soups)
new soup('Soupe au poivron', Soups)
new soup('Soupe au poulet', Soups)
new soup('Soupe au poisson', Soups)
new soup('Soupe aux légumes', Soups)
new soup('Soupe aux tomates', Soups)

function App() {
  
  const [cart, setCart] = useState([])
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const addToCart = (soup, quantity) => {
    quantity = quantity ? quantity:1;
    soup = Soups[soup-1]
    // console.log('Adding', quantity ? quantity:1, soup.name, 'in cart');

    if (cart.find(item => item.id == soup.id)) {
      const index = cart.findIndex(item => item.id == soup.id);
      cart[index].quantity += quantity;
      setCart([...cart]);
    }
    else {
      cart.push({id: soup.id, name: soup.name, quantity: quantity, price: soup.price});
      setCart(cart)
    }
    // console.log(cart)
    setTotalQuantity(totalQuantity + quantity)
    setTotalPrice(totalPrice + quantity*soup.price)
  }

  const removeFromCart = (soup) => {
    // console.log('Removing', soup, 'from cart');
    const index = cart.findIndex(item => item.id == soup.id);
    let q = cart[index].quantity;
    let p = cart[index].price;
    cart.splice(index, 1);
    setCart([...cart]);
    setTotalQuantity(totalQuantity - q)
    setTotalPrice(totalPrice - p*q)
  }

  const resetCart = () => {
    setCart([])
    setTotalQuantity(0)
    setTotalPrice(0)
  }

  return (
    <div className="bg-black h-screen w-screen overflow-hidden">
      <header className="flex flex-row h-20 bg-pink text-white justify-between px-8 py-4 border-b-2 border-white">
        <h1 className="text-4xl">
          DrinkEats
        </h1>
        <div className="flex flex-row space-x-4"> 
          <button className="bg-blue border-2 border-blue hover:border-white text-white font-bold py-2 px-4 rounded">
            Log in
          </button>
          <button className="border-2 border-transparent hover:border-green text-white font-bold py-2 px-4 rounded">
            Sign in
          </button>
        </div>
      </header>

      <div className="h-full">
        <div className="grid grid-cols-3 grid-flow-row gap-4 h-full bg-green px-16 pt-8 pb-32 overflow-auto">
          {Soups.map(s => (
            <Soup soup={s} key={s.id} addToCart={addToCart}/>
          ))}
        </div>
      </div>
      <Cart cart={cart} quantity={totalQuantity} price={totalPrice} resetCart={resetCart} removeFromCart={removeFromCart}/>
    </div>
  );
}

export default App;
