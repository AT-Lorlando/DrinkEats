import React from 'react';
import Cart from './components/cart.js';
import Soup, {soup} from './components/soup.js';
import Command from './components/command.js';

class App extends React.Component {
   
  // Constructor 
  constructor(props) {
      super(props);
 
      this.state = {
          items: [],
          DataisLoaded: false,
          cart : {q: 0, t: 0, items: []},
          flagCommand : false,
          Soups : []
      };
      this.addToCart = this.addToCart.bind(this);
      this.removeFromCart = this.removeFromCart.bind(this);
      this.resetCart = this.resetCart.bind(this);
  }

  addToCart = (soup, quantity) => {
    quantity = quantity ? quantity:1;
    soup = this.state.Soups[soup];
    // console.log('Adding', quantity ? quantity:1, soup.name, 'in cart');
  
    if (this.state.cart.items.find(item => item.id === soup.id)) {
      const index = this.state.cart.items.findIndex(item => item.id === soup.id);
      // Mutation
      this.setState((state) => ({
        cart: {
          q: state.cart.q + quantity,
          t: state.cart.t + (soup.price * quantity),
          items: state.cart.items.map((item, i) => {
            if (i === index) {
              return {
                ...item,
                quantity: item.quantity + quantity
              };
            }
            return item;
          }
          )
        }
      }));
    }
    else {
      // this.state.cart.items.push({id: soup.id, name: soup.name, quantity: quantity, price: soup.price});
      this.setState((state) => ({
        cart: {
          q: state.cart.q + quantity,
          t: state.cart.t + (soup.price * quantity),
          items: [...state.cart.items, {id: soup.id, name: soup.name, quantity: quantity, price: soup.price}]
        }
      }));
    }
    // this.state.cart.q += quantity;
    // this.state.cart.t += quantity * soup.price;
    // this.setState((state) => ({
    //   totalQuantity: state.totalQuantity + quantity,
    //   totalPrice: state.totalPrice + quantity*soup.price
    // }))
    console.log(this.state.cart)

  }

    
  removeFromCart = (soup) => {
    const index = this.state.cart.items.findIndex(item => item.id === soup.id);
    console.log(this.state.cart,index, soup.id)
    let q = this.state.cart.items[index].quantity;
    let p = this.state.cart.items[index].price;
    // Mutation
    this.setState((state) => ({
      cart: {
        q: state.cart.q - q,
        t: state.cart.t - (p * q),
        items: state.cart.items.filter((item, i) => i !== index)
      }
    }));
    // if (this.state.totalPrice - p*q === 0) {
    //   this.setState({
    //     flagCommand : true
    //   }) 
    // }
  }
  
  resetCart = () => {
    this.setState({
      cart: {q: 0, t: 0, items: []}
    })
    
  }
  
  showCommand = () => {
    if (this.state.cart.q > 0) {
      this.setState({flagCommand : true})}
  }

  componentDidMount() {
    console.log("Mounted")
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json()
      .then((json) => {
        json = [
          new soup('Soupe au chou', 0) ,
          new soup('Soupe Miso', 1) ,
          new soup('Soupe champignon', 2),
          new soup('Soupe au poivron', 3),
          new soup('Soupe au poulet', 4),
          new soup('Soupe au poisson', 5),
          new soup('Soupe aux légumes', 6),
          new soup('Soupe aux tomates', 7),
        ]
        this.setState({
          Soups: json,
          DataisLoaded: true
        })          
      }))
  }



  render() {
      const { DataisLoaded, items, cart, totalQuantity, totalPrice, flagCommand, Soups } = this.state;
      
      return (
        <div className="bg-black h-screen w-screen overflow-hidden">
          <header className="flex flex-row h-20 bg-pink text-white justify-between px-8 py-4 border-b-2 border-white">
            <h1 className="text-4xl">
              DrinkEats
            </h1>
            <div className="flex flex-row space-x-4"> 
              <button className="bg-blue-500 border-2 border-blue-500 hover:border-white text-white font-bold py-2 px-4 rounded">
                Log in
              </button>
              <button className="border-2 border-transparent hover:border-green text-white font-bold py-2 px-4 rounded">
                Sign in
              </button>
            </div>
          </header>
    
          <div className="h-full">
            <div className="grid grid-cols-3 grid-flow-row gap-4 h-full bg-green px-16 pt-8 pb-32 overflow-auto">
              {Soups.map(soup => {
                  return (
                      <Soup key={soup.id} soup={soup} addToCart={this.addToCart}/>
                  )
              })}
            </div>
          </div>
          <Cart cart={this.state.cart} 
            showCommand={this.showCommand} 
            resetCart={this.resetCart} 
            removeFromCart={this.removeFromCart}/>
          {flagCommand && <div className="absolute inset-0 h-screen w-screen bg-black bg-opacity-40">
            <Command 
            cart={cart} 
            quantity={totalQuantity} 
            price={totalPrice} 
            cancelCommand={() => {this.setState({flagCommand : false})}} 
            removeFromCart={this.removeFromCart}/>
            </div>}
        </div>
      )
}
}

export default App;
