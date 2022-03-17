import React, {useState} from 'react'

function Cart(props) {
    return (
        <div className="absolute bottom-0 right-0 mb-4 mr-4 h-auto w-80 bg-pink rounded-md flex flex-col justify-around items-center py-2">
            <h1 className="text-3xl text-blue border-b-2 border-gray-200 w-full text-center pb-2">Votre panier</h1>
            {props.quantity == 0 && <h2 className="text-lg">Vous n'avez aucune soupe.</h2>}
            {props.quantity > 0 && <h2 className="text-lg">Vous avez {props.quantity} soupe pour {props.price.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}</h2>}
            <div className="flex flex-col items-center pb-2 pl-8 w-full space-y-1">
            {props.cart.map((item, index) => (
                <div key={index} className="flex flex-row w-full">
                    <button className=" bg-red-700 hover:bg-red-800 text-white font-bold px-1 mr-2 rounded" onClick={() => {props.removeFromCart(item)}}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                    <p className="w-full">{item.quantity} {item.name}: {(item.quantity * item.price).toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}</p>
                </div>
            ))}    
            </div>
            <div className="w-full flex flex-row justify-between px-4">
                <button className="border-2 border-gray-100 hover:border-gray-400 text-white font-bold py-2 px-4 rounded" onClick={props.resetCart}>
                    Vider
                </button>
                <button className="bg-blue border-2 border-blue hover:border-white text-white font-bold py-2 px-4 rounded">
                    Commander
                </button>
            </div>
        </div>
    );
  }

  export default Cart;