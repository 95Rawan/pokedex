const pokemonsInfo = require('../pokemons.json');

exports.searchAutocompleteData = (req, res) => {
	let searchBy = {};
	for (let i = 0; i < pokemonsInfo.length; i++) {
		const pokemon = pokemonsInfo[i];
		Object.assign(searchBy, { [pokemon.name.english]: null });
	}
	return res.send(searchBy);
};

exports.searchResult = (req, res) => {
	const pokemonName = req.params.name;
	const wantedPokemon = pokemonsInfo.filter(
		(pokemon) => pokemon.name.english === pokemonName
	);
	return res.send(wantedPokemon);
};
