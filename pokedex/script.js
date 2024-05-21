function buscarPokemon() {
    const pokemonNumber = document.getElementById('pokemonNumber').value;
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
        .then(response => response.json())
        .then(data => {
            exibirPokemon(data);
        })
        .catch(error => {
            console.error('Erro ao buscar o Pokémon:', error);
        });
}

function exibirPokemon(pokemon) {
    const pokemonInfoDiv = document.getElementById('pokemonInfo');
    const pokemonImageContainer = document.getElementById('pokemonImageContainer');

    pokemonImageContainer.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="pokemon-image">
    `;

    pokemonInfoDiv.innerHTML = `
        <h2>${pokemon.name}</h2>
        <p><strong>Tipo(s):</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
        <p><strong>Peso:</strong> ${pokemon.weight} kg</p>
        <p><strong>Altura:</strong> ${pokemon.height} m</p>
        <p><strong>Número:</strong> ${pokemon.id}</p>
    `;
}