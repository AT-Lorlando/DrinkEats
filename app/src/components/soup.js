import React, {useState, useEffect} from 'react'
import Select from 'react-select'
 
const options = []
for(let i=1; i<=10; i++) { 
    options.push({value: i, label: `${i}`})
}

function Soup(props) {
    const [selectedOption, setSelectedOption] = useState(1);

    return (
        <div className="rounded-xl border-2 border-white px-4 pt-2 flex flex-col justify-around bg-black bg-opacity-5">
            <h1 className="text-3xl text-blue">{props.name}</h1>
            <div className="flex flex-row">
                <img className="h-24 w-24 rounded-full border-2 border-white fit" src={`soup/${props.id}.png`} />
                <div className="ml-2 pl-2 border-l-2 border-white">
                    <p>Coucou c'est les ingrédients</p>
                    <p>Y'a du chou</p>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <button className="hover:underline">
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
            </div>
        </div>
    );
  }

  export default Soup;