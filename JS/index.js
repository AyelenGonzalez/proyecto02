const pokedex = document.getElementById('pokedex');
//fetching pokemon's name, image, type and id from pokeapi
const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};
const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokemon) => `
            <div class="card" style="width: 15rem;">
            <img src="${pokemon.image}" class="card-img-top" alt="${pokemon.name}">
            <div class="card-body">
              <h5 class="card-title text-center">${pokemon.name}</h5>
              <p class="card-text">${pokemon.type}</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
      
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
