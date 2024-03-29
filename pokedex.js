const pokeContainer = document.querySelector("#pokeContainer");
const select = document.getElementById("pesquisar");
const countSpan = document.getElementById("count");
const countSpan2 = document.getElementById("count2");
const barraDeProgresso = document.getElementById("barra-de-progresso");
const concluido = document.getElementById("concluido");
const pokemonCount = 2000;

let contador = 0;

let allData = [];

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
  dark: "#525252",
  ice: "#83DFFA",
  steel: "#9E9E9E",
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

  contador++;
  countSpan.innerHTML = "Loading : " + contador + " Pokemons";

  console.log(data);

  const percentualConcluido = (contador / pokemonCount) * 100;
  barraDeProgresso.value = percentualConcluido;
  allData.push(data);
  criaPokemonCartas(data);

  if (contador == pokemonCount) {
    concluido.innerHTML = "Concluido";
    countSpan.innerHTML = "";
    barraDeProgresso.value = "";
  }
};

const criaPokemonCartas = (poke) => {
  const name = poke.name[0].toUpperCase() + poke.name.slice(1).split("-", 1);

  const hp = poke.stats[0].base_stat;

  const atk = poke.stats[1].base_stat;

  const def = poke.stats[2].base_stat;

  //console.log(poke.stats);

  const id = poke.id.toString().padStart(3, "0");

  const pokeTipos = poke.types.map((type) => type.type.name);
  //console.log(pokeTipos);

  //console.log(value)
  const type = baseTipos.find((type) => pokeTipos.indexOf(type) > -1);

  let tipos = "";

  poke.types.forEach((e) => {
    tipos = !tipos ? e.type.name : tipos + " / " + e.type.name;
  });

  const cor = tipoCor[type];

  //console.log(cor)

  //console.log(select)

  const cartas = document.createElement("div");
  cartas.classList.add("borda", type);

  const borda = document.createElement("div");
  borda.classList.add("pokemon");

  cartas.style.backgroundColor = cor;

  const pokemonInnerHTML = `
 
    <div class="pokemon ">
    
    
    <span class="number">#${id}</span>
   
    
    <div class="imgContainer  pattern1">
    
          <img class="image-shadow" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png " alt="${name}">
    </div>


    

    <div class="info">
    
    
      <span class="hp">HP: <b>${hp} </b></span>
      <span class="atk">ATK: <b>${atk} </b></span>
      <span class="def">DEF: <b>${def} </b></span>
      <span class="spd">SPD: <b>${def} </b></span>
  
        <h3 class="name" >${name}</h3>
        <div class="small" id="type">Type: <span><b>${tipos}</b></span></div>
      
      
    </div> `;

  cartas.innerHTML = pokemonInnerHTML;

  pokeContainer.appendChild(cartas);
};

function pesquisar() {
  pokeContainer.innerHTML = "";

  const value = select.options[select.selectedIndex].value;

  if (value == "todos") {
    allData.forEach((e) => {
      criaPokemonCartas(e);
    });
  } else {
    let filtro = [];

    allData.forEach((e) => {
      e.types.forEach((t) => {
        if (t.type.name == value) {
          filtro.push(e);
        }
      });
    });

    //console.log(filtro)
    //criaPokemonCartas(filtro);

    filtro.forEach((element) => {
      //console.log(element)
      criaPokemonCartas(element);
    });
  }
}

fetchPokemon();
