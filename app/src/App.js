import React, { useState } from 'react';
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
    console.log('Adding', quantity ? quantity:1, soup.name, 'in cart');

    if (cart.find(item => item.soup == soup.id)) {
      const index = cart.findIndex(item => item.soup == soup.id);
      cart[index].quantity += quantity;
      setCart([...cart]);
    }
    else {
      cart.push({soup: soup.id, quantity: quantity});
      setCart(cart)
    }
    console.log(cart)
    let total = 0;
    cart.forEach(item => {
    total += item.quantity
    })
    setTotalQuantity(total)
    console.log(total)
    setTotalPrice(totalPrice + quantity*soup.price)
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
      <Cart quantity={totalQuantity} price={totalPrice}/>
    </div>
  );
}

export default App;
