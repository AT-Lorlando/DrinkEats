import React from 'react'
class Command extends React.Component {

    // Constructor

    confirm = () => {
        const form = document.getElementById('commandForm');
        const inputs = form.getElementsByTagName('input');
        let valid = true;
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value == '') {
                console.log(inputs[i].value);
                inputs[i].className += 'text-red-500 placeholder-red-500';
                valid = false;
            }
        }
        if (valid) {
            let command = {
                order: [],
                client: 0,
                address: '',
                total: 0
            }
            this.props.cart.items.forEach(item => {
                command.order.push({name: item.name, id: item.id, quantity: item.quantity})
            })
            command.client = 6541;
            command.address = document.getElementById('address').value + ' ' + document.getElementById('postalCode').value + ' ' + document.getElementById('city').value
            command.total = this.props.price;
            console.log(command)
            alert("Commande confirmée !");
        } else {
            alert("Veuillez remplir tous les champs");
        }
    }

    render() {       
        return (
            <div className="absolute border-4 border-brown top-40 left-1/3 h-auto w-1/3 bg-pink rounded-md flex flex-col justify-between items-center py-2">
                <h1 className="text-3xl text-gray-100 border-b-2 border-gray-200 w-full text-center pb-2">Votre panier</h1>
                <div className="flex flex-col items-center py-2 pl-8 w-full space-y-1">
                {this.props.cart.items.map((item, index) => (
                    <div key={index} className="flex flex-row w-1/2">
                        <button className=" bg-red-700 hover:bg-red-800 text-white font-bold px-1 mr-2 rounded" onClick={() => {this.props.removeFromCart(item)}}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                        <p className="w-full">{item.quantity} {item.name}: {(item.quantity * item.price).toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}</p>
                    </div>
                ))}
                <div className="w-full text-right px-4">
                    <p className="text-lg">Total: {this.props.cart.t.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}</p>
                </div>
                </div>
                <h1 className="text-3xl text-gray-100 border-b-2 border-gray-200 w-full text-center pb-2">Vos informations de livraison</h1>
                <form id="commandForm" className="flex flex-col justify-between px-4 w-full my-2 space-y-1 pb-4 border-b-2 border-white">
                    <div className="flex flex-row w-full justify-between space-x-4">
                        <div className="flex flex-col w-1/2">
                            <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nom</label>
                            <input className="border-2 border-gray-100 w-full py-1 px-2 rounded" type="text" name="name" id="name" placeholder="Votre nom" defaultValue={this.props.user.lastname ? this.props.user.lastname : ""}/>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">Prénom</label>
                            <input className="border-2 border-gray-100 w-full py-1 px-2 rounded" type="text" name="firstname" id="firstname" placeholder="Votre prénom" defaultValue={this.props.user.firstname ? this.props.user.firstname : ""}/>
                        </div>
                    </div>
                    
                    <div className="flex flex-row w-full justify-between space-x-4">
                                    <div className="flex flex-col w-1/4">
                                    <label className="text-gray-700 text-sm font-bold mt-2" htmlFor="addressnumber">Numéro de rue</label>
                                <input className="border-2 border-gray-100 w-full py-1 px-2 rounded" type="text" name="address" id="address_number" placeholder="Numéro de rue" defaultValue={this.props.user.address_number ? this.props.user.address_number : ""}/>
                                    </div>
                                    <div className="flex flex-col w-3/4">
                                    <label className="text-gray-700 text-sm font-bold mt-2" htmlFor="addressname">Adresse</label>
                                <input className="border-2 border-gray-100 w-full py-1 px-2 rounded" type="text" name="address" id="address_street" placeholder="Votre nom de rue" defaultValue={this.props.user.address_street ? this.props.user.address_street : ""}/>
                                    </div>
                                </div>
                    
                        <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="city">Ville</label>
                        <input className="border-2 border-gray-100 w-full py-1 px-2 rounded" type="text" name="city" id="city" placeholder="Votre ville" defaultValue={this.props.user.address_city ? this.props.user.address_city : ""}/>
                    
                        <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="postalCode">Code postal</label>
                        <input className="border-2 border-gray-100 w-full py-1 px-2 rounded" type="text" name="postalCode" id="postalCode" placeholder="Votre code postal" defaultValue={this.props.user.address_zip ? this.props.user.address_zip : ""}/>
                    
                        <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Téléphone</label>
                        <input className="border-2 border-gray-100 w-full py-1 px-2 rounded" type="text" name="phone" id="phone" placeholder="Votre numéro de téléphone" defaultValue={this.props.user.phone ? this.props.user.phone : ""}/>
                </form>
                <div className="w-full flex flex-row justify-between px-4">
                    <button className="border-2 border-gray-100 hover:border-gray-400 text-white font-bold py-2 px-4 rounded" onClick={this.props.cancelCommand}>
                        Annuler
                    </button>
                    <button className="bg-blue-500 border-2 border-blue-500 hover:border-white text-white font-bold py-2 px-4 rounded" onClick={this.confirm}>
                        Commander
                    </button>
                </div>
            </div>
        );
    }
}

export default Command;