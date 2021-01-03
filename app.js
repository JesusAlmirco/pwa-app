// Declarate constants
const pokemonList = document.querySelector('#pokemonList');

const defaultPokemon = "https://pokeapi.co/api/v2/pokemon/1/";
const pokemonCard = document.querySelector("#pokemonCard");

window.addEventListener('load', (e) => {
  getPokemonList().then(() => {
		showPokemonCard(defaultPokemon);
	});

  pokemonList.addEventListener("change", (e) => {
		showPokemonCard(e.target.value);
	});
  
});

// Pokemon select
async function getPokemonList() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=35');
  const json = await response.json();

  pokemonList.innerHTML = json.results.map(
  (result) => `<option value="${result.url}">${result.name}</option>`
  )
}
//POkemon card detail
async function showPokemonCard(url) {
  const response = await fetch(url);
  const json = await response.json();

  pokemonCard.innerHTML = createCard(json);
}

// Pokemon create card
function createCard(pokemon) {
	return `
    <div class="card-header">
        <h2>#${pokemon.id}</h2>
    </div>
    <img
        src="${pokemon.sprites.other.dream_world.front_default}"
        class="card-img-top"
        width="150"
		height="150"
		alt="${pokemon.name}"
    />
    <div class="card-body">
        <h3
            class="card-title"
            style="text-transform: capitalize"
        >
            ${pokemon.name}
        </h3>
        <div class="badge badge-warning">Height: ${pokemon.height}</div>
        <div class="badge badge-danger">Weight: ${pokemon.weight}</div>
    </div>
    `;
}
