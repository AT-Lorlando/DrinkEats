import React from 'react';
import Cart from './components/cart.js';
import Soup, {soup} from './components/soup.js';
import Command from './components/command.js';
import Modal from './components/modal.js';
import axios from 'axios';

const url = 'http://176.128.9.92:8008'

class App extends React.Component {
   
  // Constructor 
  constructor(props) {
      super(props);
 
      this.state = {
          items: [],
          DataisLoaded: false,
          cart : {q: 0, t: 0, items: []},
          modalCommand : false,
          modalLogin : false,
          modalSignup : false,
          Soups : [],
          token : "",
          user : {},
      };
      this.addToCart = this.addToCart.bind(this);
      this.removeFromCart = this.removeFromCart.bind(this);
      this.resetCart = this.resetCart.bind(this);
      this.login = this.login.bind(this);
      this.signup = this.signup.bind(this);
      this.sendCommand = this.sendCommand.bind(this);
  }

  addToCart = (id, quantity) => {
    quantity = quantity ? quantity:1;
    let soup = this.state.Soups.find(soup => soup.id === id)
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
    // console.log(this.state.cart)
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
    //     modalCommand : true
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
      this.setState({modalCommand : true})}
  }

  componentDidMount() {
    console.log("Fetching")
    axios.get(`${url}/api/soup/`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        'Accept': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      }
    })
      .then((res) => {
        let fetchedSoups = []
        res.data.soups.forEach(s => {
          fetchedSoups.push(new soup(s.title, s._id, s.description, s.details, s.price))
        })
        console.log(fetchedSoups)
        this.setState({
          Soups: fetchedSoups,
          DataisLoaded: true
        })      
      })

  }

  login = (e, param = {}) => {
    e.preventDefault();
    let mail, password;
    if (param.email && param.password) {
      let user = param.user
      mail = param.email;
      password = param.password;
      console.log('login with', mail, password)
      axios.post(`${url}/api/auth/login`, {
          email: mail,
          password: password
        })
        .then((res) => {
          console.log(res.data)
          user.id = res.data.userId
          if (res.data.token) {
            this.setState({
              token: res.data.token,
              user: user
            })
            console.log("Loged in, token: ", this.state.token)
          }
        })
    } else {
      mail = e.target.elements.mail.value;
      password = e.target.elements.password.value;
      console.log('login with', mail, password)
      axios.post(`${url}/api/auth/login`, {
        email: mail,
        password: password
      })
      .then((res) => {
        console.log(res.data)
        if (res.data.token) {
          this.setState({
            token: res.data.token,
            modalLogin : false,
            user : {
              id: res.data.userId,
              firstname: res.data.first_name,
              lastname: res.data.last_name,
              email: res.data.email,
              address_number: res.data.address_number,
              address_street: res.data.address_street,
              address_city: res.data.address_city,
              address_zip: res.data.address_zip,
              phone: res.data.phone
            }
          })
          console.log("Loged in, token: ", this.state.token)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  signup = (e) => {
    e.preventDefault();
    let user = {
      id: '',
      firstname: e.target.elements.firstname.value,
      lastname: e.target.elements.name.value,
      email: e.target.elements.mail.value,
      password: e.target.elements.password.value,
      address_number: e.target.elements.address_number.value,
      address_street: e.target.elements.address_street.value,
      address_city: e.target.elements.address_city.value,
      address_zip: e.target.elements.address_zip.value,
      phone: e.target.elements.phone.value,
    }
    console.log("Sign up", user)
    console.log(this.state.token)
    axios.post(`${url}/api/auth/signup`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        'Accept': 'application/json',
      },
      token: this.state.token,
      email: user.email,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
      address_number: user.address_number,
      address_street: user.address_street,
      address_city: user.address_city,
      address_zip: user.address_zip,
      phone: user.phone
    })
    .then((res) => {
      console.log(res.data)
      this.login(e, {email: user.email, password: user.password, user: user})
      this.setState({
        modalSignup : false,
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  sendCommand = (command) => {
    console.log("Send command")
    console.log(command)
    axios.post(`${url}/api/order/`, {
      userId: this.state.user.id,
      products: command.items,
      address_number: command.address_number,
      address_street: command.address_street,
      address_city: command.address_city,
      address_zip: command.address_zip,
      phone: command.phone
    }, {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        "Content-Type": "application/json; charset=utf-8",
        'Accept': 'application/json'
      }})
    .then((res) => {
      console.log(res.data)
      this.setState({
        modalCommand : false,
        cart: {q: 0, t: 0, items: []}
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render() {
      const { cart, totalQuantity, totalPrice, modalCommand, Soups, modalLogin, modalSignup} = this.state;
      
      return (
        <div className="bg-black h-screen w-screen overflow-hidden">
          <header className="flex flex-row h-20 bg-pink text-white justify-between px-8 py-4 border-b-2 border-white">
            <h1 className="text-4xl">
              DrinkEats
            </h1>
            {this.state.token === "" && <div className="flex flex-row space-x-4"> 
              <button className="bg-blue-500 border-2 border-blue-500 hover:border-white text-white font-bold py-2 px-4 rounded" onClick={() => {this.setState({modalLogin : true})}}>
                Log in
              </button>
              <button className="border-2 border-transparent hover:border-green text-white font-bold py-2 px-4 rounded" onClick={() => {this.setState({modalSignup : true})}}>
                Sign in
              </button>
            </div>}
            {this.state.token !== "" && <div className="flex flex-row space-x-4"> 
              <span className="bg-blue-500 border-2 border-blue-500 hover:border-white text-white font-bold py-2 px-4 rounded" onClick={() => {this.setState({modalLogin : true})}}>
                {this.state.user.firstname}
              </span>
              <button className="border-2 border-transparent hover:border-green text-white font-bold py-2 px-4 rounded" onClick={() => {this.setState({token : "", user: {}})}}>
                Log out
              </button>
            </div>}
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
            removeFromCart={this.removeFromCart}
            user={this.state.user}/>
          {modalCommand && <div className="absolute inset-0 h-screen w-screen bg-black bg-opacity-40">
            <Command 
            cart={cart} 
            quantity={totalQuantity} 
            price={totalPrice} 
            cancelCommand={() => {this.setState({modalCommand : false})}} 
            removeFromCart={this.removeFromCart}
            user={this.state.user}
            sendCommand={this.sendCommand}/>
            </div>}
            {modalLogin && <div className="absolute inset-0  h-screen w-screen bg-black bg-opacity-40">
            <Modal 
            type={"login"}
            cancel={() => {this.setState({modalLogin : false})}}
            confirm={this.login}
            />
            </div>}
            {modalSignup && <div className="absolute inset-0 h-screen w-screen bg-black bg-opacity-40">
            <Modal 
            type={"signup"}
            cancel={() => {this.setState({modalSignup : false})}}
            confirm={this.signup}
            />
            </div>}
        </div>
      )
}
}

export default App;
