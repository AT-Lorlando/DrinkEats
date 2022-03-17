import logo from './logo.svg';
import './App.css';
import Soup from './components/soup.js';

const Soups = []
class soup {
    constructor(name) {
      this.name = name;
      Soups.push(this);
      this.id = Soups.indexOf(this)+1;
      this.ingredients = "Tomates,Boeuf,Poulet,Citron";
    }
}

new soup('Soupe au chou') 
new soup('Soupe Miso') 
new soup('Soupe champignon')
new soup('Soupe au poivron')
new soup('Soupe au poulet')
new soup('Soupe au poisson')
new soup('Soupe aux légumes')
new soup('Soupe aux tomates')

function App() {
  return (
    <div className="bg-black h-screen w-screen overflow-hidden">
      <header className="flex flex-row h-20 bg-pink text-white justify-between px-8 py-4 border-b-2 border-white">
        <h1 className="text-4xl">
          DrinkEats
        </h1>
        <div className="flex flex-row space-x-4"> 
          <button className="bg-blue border-2 border-blue hover:border-white text-white font-bold py-2 px-4 rounded">
            Log in
          </button>
          <button className="border-2 border-transparent hover:border-green text-white font-bold py-2 px-4 rounded">
            Sign in
          </button>
        </div>
      </header>

      <div className="h-full">
        <div className="grid grid-cols-3 grid-flow-row gap-4 h-full bg-green px-16 pt-8 pb-32 overflow-auto">
          {Soups.map(s => (
            <Soup name={s.name} id={s.id} ingredients={s.ingredients} key={s.id}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
