const pokemonsInfo = require('../pokemons.json');

exports.getFiveRandomPokemons = (req, res) => {
	let pokemons = [];

	for (let i = 0; i < 5; i++) {
		const randomIndex = Math.floor(Math.random() * pokemonsInfo.length);
		let pokemon = pokemonsInfo[randomIndex];
		pokemons.push(pokemon);
	}
	res.render('home', {
		pokemons,
	});
};
