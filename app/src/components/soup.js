import React from 'react'
import Select from 'react-select'

export class soup {
    constructor(name, id) {
      this.name = name;
      this.id = id
      this.ingredients = "Tomates,Boeuf,Poulet,Citron";
      this.price = Math.floor(Math.random() * (3) + 8) - 0.01;
    }
}

const options = []
for(let i=1; i<=10; i++) { 
    options.push({value: i, label: `${i}`})
} 

class Soup extends React.Component {

    // Constructor 
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: 1,
            details: false,
            soup: props.soup,
            ingredients: props.soup.ingredients.split(',')
        };
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
      };

    render() {       
        const { selectedOption, details, soup, ingredients } = this.state;
        
        return (
            <div className="rounded-xl border-2 border-white px-4 pt-2 flex flex-col justify-around bg-black bg-opacity-5">
                <div className="w-full flex flex-row justify-between px-2">
                <h1 className="text-3xl text-gray-700">{soup.name}</h1>
                <h1 className="text-3xl text-gray-700">{soup.price.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}</h1>
                </div>
    
                <div className="flex flex-row">
                    <img className="h-24 w-24 rounded-full border-2 border-white fit" src={`soup/${soup.id+1}.png`} />
                    {!details && <div id={`ingredients-${soup.id}`} className="ml-2 pl-2 border-l-2 border-white">
                        <div>
                            <p>Coucou c'est les ingrédients</p>
                            {ingredients.map((i, index) => (
                                <span key={index}>{i} </span>))}
                        </div>
                    </div>}
                    {details && <div id={`details-${soup.id}`} className="ml-2 pl-2 border-l-2 border-white">
                        <div>
                            <p>Coucou c'est les détails</p>
                            {'Je sais pas'}
                        </div>
                    </div>}
                </div>
                <div className="flex flex-row justify-between">
                    <button id={`btn-${soup.id}`} className="hover:border-b-2 border-gray-400" onClick={() => (this.setState((state) => (
                        {details: !state.details})))} >
                        Voir les détails
                    </button>
                    <div className="flex flex-row space-x-4">
                    <Select
                        defaultValue={selectedOption}
                        onChange={this.handleChange}
                        options={options}
                        placeholder={1}
                    />
    
                    <button className="border-2 border-pink hover:border-white px-2 rounded-md" onClick={() => (this.props.addToCart(this.state.soup.id, this.state.selectedOption.value))}>
                        Ajouter
                    </button>
                    </div>
                </div>
            </div>
        );
    }
}

  export default Soup;