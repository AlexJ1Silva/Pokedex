const pokeContainer = document.querySelector("#pokeContainer");


const pokemonCount = 2000;

const tipoCor = {
    fire: "#FF6C53",
    grass: "#AEFFED",
    electric: "#F2FF80",
    water: "#53D9FF",
    ground: "#DD6F00",
    rock: "#BBCAB7",
    fairy: "#FFAEFD",
    poison: "#C671AA",
    bug: "#7DFF94",
    dragon: "#97b3e6",
    psychic: "#5AEFBF",
    flying: "#CAE2FF",
    fighting: "#EEC0B0",
    normal: "#F5F5F5",
};

const baseTipos = Object.keys(tipoCor);

const fetchPokemon = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i);
    }
};

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    criaPokemonCartas(data);
};

const criaPokemonCartas = (poke) => {
    const cartas = document.createElement('div');
    cartas.classList.add("borda");

    const borda = document.createElement('div');
    borda.classList.add("pokemon")
   
    

    const name = poke.name[0].toUpperCase() + poke.name.slice(1).split("-",1);

    const id = poke.id.toString().padStart(3, "0");

    const pokeTipos = poke.types.map(type => type.type.name);

    const type = baseTipos.find(type => pokeTipos.indexOf(type) > -1);

    const cor = tipoCor[type];

   

    cartas.style.backgroundColor = cor;

 
        
   
   

    const pokemonInnerHTML = 
    ` 
    <div class="pokemon ${type}">    
    <div class="imgContainer">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png " alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name" >${name}</h3>
    <div class="small" id="type">Type: <span><b>${type}</b></span>
    </div>
    </div>
    </div> `;

    cartas.innerHTML = pokemonInnerHTML

    pokeContainer.appendChild(cartas)
     
};

fetchPokemon()