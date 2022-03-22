import React from 'react'
class Modal extends React.Component {

    // Constructor 
    constructor(props) {
        super(props);

        this.state = {
            type: props.type,
            error: null,
            confirm: props.confirm
        };
    }

    test = (e) => {
        e.preventDefault();
        console.log('test')
    }

    render() {       
        const { error, type, confirm } = this.state;
        
        if(type === 'login') {
            return ( 
                <div className="fixed h-screen w-full bg-black bg-opacity-30">
                    <div className="relative bg-white border-2 border-blue-400 w-2/6 h-auto mx-auto mt-56 p-4 rounded-lg">
                        <div className="absolute top-4 right-4">
                            <button onClick={this.props.cancel} className="text-2xl text-blue-500 hover:text-blue-700">
                                <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
                            </button>
                        </div>
                        <div v-if="MODAL == 'login'" className="w-full flex flex-col items-center">
                            <div className="my-4 w-full text-center"><h2 className="text-2xl">Se connecter</h2>
                            {error && <h1 className="text-red-500 text-center">Erreur : {{ error }}</h1>}
                            </div>
                            <form className="flex flex-col w-3/5" onSubmit={confirm}>
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="mail">Email</label>
                                    <input className="border-2 border-gray-100 w-full py-1 px-2 rounded" type="mail" name="mail" id="mail" placeholder="Votre adresse mail" />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="password">Mot de pass</label>
                                    <input className="border-2 border-gray-100 w-full py-1 px-2 rounded" type="password" name="password" id="password" placeholder="Votre mot de passe" />
                                </div>
                                <button type="submit" className="bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 text-white px-8 py-3 my-2 text-sm focus:outline-none focus:ring-2   focus:ring-indigo-600 rounded border shadow">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        else if(this.state.type === 'signup') {
            return ( 
                <div className="fixed h-screen w-full bg-black bg-opacity-30">
                    <div className="relative bg-white border-2 border-blue-400 w-2/6 h-auto mx-auto mt-56 p-4 rounded-lg">
                        <div className="absolute top-4 right-4">
                            <button onClick={this.props.cancel} className="text-2xl text-blue-500 hover:text-blue-700">
                                <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
                            </button>
                        </div>
                        <div className="w-full flex flex-col items-center">
                            <div className="my-4 w-full text-center"><h2 className="text-2xl">S'inscrire</h2>
                            {error && <h1 className="text-red-500 text-center">Erreur : {{ error }}</h1>}
                            </div>
                            <form className="flex flex-col w-3/5" onSubmit={confirm}>
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="mail">Email</label>
                                        <input className="border-2 border-gray-100 w-full py-1 px-2 rounded" type="mail" name="mail" id="mail" placeholder="Votre adresse mail" />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="password">Mot de pass</label>
                                    <input className="border-2 border-gray-100 w-full py-1 px-2 rounded" type="password" name="password" id="password" placeholder="Votre mot de passe" />
                                </div>
                                <button type="submit" className="bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 text-white px-8 py-3 my-2 text-sm focus:outline-none focus:ring-2   focus:ring-indigo-600 rounded border shadow">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
        )}
    }
}


  
export default Modal;