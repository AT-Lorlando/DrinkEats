import React, {useState} from 'react'
import Select from 'react-select'

export class soup {
    constructor(name, tab) {
      this.name = name;
      tab.push(this);
      this.id = tab.indexOf(this)+1;
      this.ingredients = "Tomates,Boeuf,Poulet,Citron";
      this.price = Math.floor(Math.random() * (3) + 8) - 0.01;
    }
}

const options = []
for(let i=1; i<=10; i++) { 
    options.push({value: i, label: `${i}`})
}

function Soup(props) {
    const [selectedOption, setSelectedOption] = useState(1);
    
    let details = false;
    let soup = props.soup;
    let ingredients = soup.ingredients.split(',');

    function handleDetails() {
        details = !details;
        let el = document.getElementById(`ingredients-${soup.id}`);
        let new_child = document.createElement('div');
        if(details) {
            el.removeChild(el.childNodes[0])
            new_child.innerHTML = `
            <p>Coucou c'est les détails</p>
            <p>Aucune idée</p>
            `;      
            el.appendChild(new_child);
        } else {
            el.removeChild(el.childNodes[0])
            new_child.innerHTML = `
            <p>Coucou c'est les ingrédients</p>
            `;
            ingredients.forEach((i, index) => {
                new_child.innerHTML += `<span key='${index}'>${i} </span>`;
            });        

            el.appendChild(new_child)
        }

        let btn = document.getElementById(`btn-${soup.id}`);
        if(details) {
            btn.className = 'border-b-2 border-gray-600'
        }
        else {
            btn.className = 'hover:underline'
        }
    }

    function handleAdd() {
        props.addToCart(soup.id, selectedOption.value)
    }

    return (
        <div className="rounded-xl border-2 border-white px-4 pt-2 flex flex-col justify-around bg-black bg-opacity-5">
            <div className="w-full flex flex-row justify-between px-2">
            <h1 className="text-3xl text-blue">{soup.name}</h1>
            <h1 className="text-3xl text-blue">{soup.price.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}</h1>
            </div>

            <div className="flex flex-row">
                <img className="h-24 w-24 rounded-full border-2 border-white fit" src={`soup/${soup.id}.png`} />
                <div id={`ingredients-${soup.id}`} className="ml-2 pl-2 border-l-2 border-white">
                    <div>
                        <p>Coucou c'est les ingrédients</p>
                        {ingredients.map((i, index) => (
                            <span key={index}>{i} </span>))}
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <button id={`btn-${soup.id}`} className="hover:border-b-2 border-gray-400" onClick={handleDetails} >
                    Voir les détails
                </button>
                <div className="flex flex-row space-x-4">
                <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    placeholder={1}
                />

                <button className="border-2 border-transparent hover:border-white px-2 rounded-md" onClick={handleAdd}>
                    Ajouter
                </button>
                </div>
            </div>
        </div>
    );
  }

  export default Soup;