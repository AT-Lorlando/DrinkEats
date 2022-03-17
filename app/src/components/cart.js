import React, {useState} from 'react'

function Cart(props) {

    return (
        <div className="absolute bottom-0 right-0 mb-4 mr-4 h-40 w-80 bg-pink rounded-md flex flex-col justify-around items-center py-2">
            <h1 className="text-3xl text-blue border-b-2 border-gray-200 w-full text-center pb-2">Votre panier</h1>
            {props.quantity == 0 && <h2 className="text-lg">Vous n'avez aucune soupe.</h2>}
            {props.quantity > 0 && <h2 className="text-lg">Vous avez {props.quantity} soupe pour {props.price}€</h2>}
            <div className="w-full flex flex-row justify-between px-4">
                <button className="border-2 border-gray-100 hover:border-gray-400 text-white font-bold py-2 px-4 rounded">
                    Annuler
                </button>
                <button className="bg-blue border-2 border-blue hover:border-white text-white font-bold py-2 px-4 rounded">
                    Commander
                </button>
            </div>
        </div>
    );
  }

  export default Cart;