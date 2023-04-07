const pokeContainer = document.querySelector("#pokeContainer");
const select = document.getElementById("pesquisar");
const countSpan = document.getElementById("count");
const barraDeProgresso = document.getElementById('barra-de-progresso');
const concluido = document.getElementById('concluido');
const pokemonCount = 1010;

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
  countSpan.innerHTML = contador;
  const percentualConcluido = (contador / 1010) * 100;
  barraDeProgresso.value = percentualConcluido;

if(contador == 1010){

  concluido.innerHTML = 'Concluido';
  allData.push(data);
  criaPokemonCartas(data);
}

  
 /*  update(contador); */
  
};

const criaPokemonCartas = (poke) => {
  const name = poke.name[0].toUpperCase() + poke.name.slice(1).split("-", 1);

  const id = poke.id.toString().padStart(3, "0");

  const pokeTipos = poke.types.map((type) => type.type.name);
  console.log(pokeTipos);

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
    <div class="pokemon">    
    <div class="imgContainer">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png " alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name" >${name}</h3>
    <div class="small" id="type">Type: <span><b>${tipos}</b></span>
    </div>
    </div>
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

/* function update() {

    var element = document.getElementById("myprogressBar");   
    var width = 1;
    var identity = setInterval(scene, 9);
    function scene() {
      if (width >= 100) {
        clearInterval(identity);
      } else {
        width++; 
        element.style.width = width + '%'; 
        element.innerHTML = width * 1   + '%';
      }
    }
  } */

fetchPokemon();
