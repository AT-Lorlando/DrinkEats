import React, {useState} from 'react'
import Select from 'react-select'
 
const options = []
for(let i=1; i<=10; i++) { 
    options.push({value: i, label: `${i}`})
}

function Soup(props) {
    const [selectedOption, setSelectedOption] = useState(1);
    
    let details = false;

    let ingredients = props.ingredients.split(',');

    function handleDetails() {
        details = !details;
        let el = document.getElementById(`ingredients-${props.id}`);
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

        let btn = document.getElementById(`btn-${props.id}`);
        if(details) {
            btn.className = 'border-b-2 border-gray-600'
        }
        else {
            btn.className = 'hover:underline'
        }
    }

    return (
        <div className="rounded-xl border-2 border-white px-4 pt-2 flex flex-col justify-around bg-black bg-opacity-5">
            <h1 className="text-3xl text-blue">{props.name}</h1>
            <div className="flex flex-row">
                <img className="h-24 w-24 rounded-full border-2 border-white fit" src={`soup/${props.id}.png`} />
                <div id={`ingredients-${props.id}`} className="ml-2 pl-2 border-l-2 border-white">
                    <div>
                        <p>Coucou c'est les ingrédients</p>
                        {ingredients.map((i, index) => (
                            <span key={index}>{i} </span>))}
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <button id={`btn-${props.id}`} className="hover:border-b-2 border-gray-400" onClick={handleDetails} >
                    Voir les détails
                </button>
                <div className="flex flex-row space-x-4">
                <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    placeholder={1}
                />

                <button className="border-2 border-transparent hover:border-white px-2 rounded-md">
                    Ajouter
                </button>
                </div>
            {details && <p>Voici les détails</p>}
            </div>
        </div>
    );
  }

  export default Soup;