document.addEventListener('DOMContentLoaded', async () => {
	const createPokemonCard = (pokemonInfo) => {
		// pokemon card elements
		const pokemonContainer = document.querySelector('.pokemon');

		const mainContainer = document.createElement('div');
		mainContainer.classList.add('row');

		const gridContainer = document.createElement('div');
		gridContainer.classList.add('col', 's12', 'm3', 'l2', 'grid-container');

		const cardContainer = document.createElement('div');
		cardContainer.classList.add('card', 'card-container');
		cardContainer.id = 'pokemon-card';

		const modalTrigger = document.createElement('a');
		modalTrigger.classList.add('modal-trigger', 'modal-trigger-link');
		modalTrigger.href = `#${pokemonInfo.id}modal`;

		const cardImageContainer = document.createElement('div');
		cardImageContainer.classList.add(
			'card-image',
			'responsive-img',
			'waves-effect',
			'waves-block',
			'waves-light'
		);

		const pokemonImg = document.createElement('img');
		pokemonImg.classList.add('responsive-img', 'pokemon-img');
		pokemonImg.src = pokemonInfo.image;

		const cardContentContainer = document.createElement('div');
		cardContentContainer.classList.add('card-content');

		const pokemonName = document.createElement('span');
		pokemonName.classList.add(
			'card-title',
			'modal-trigger',
			'activator',
			'grey-text',
			'text-darken-4',
			'pokemon-card-name'
		);
		pokemonName.href = `#${pokemonInfo.id}modal`;
		pokemonName.innerText = pokemonInfo.name.english;

		const cardDetailsContainer = document.createElement('div');
		cardDetailsContainer.classList.add('card-action');

		const caughtPokemonButton = document.createElement('button');
		caughtPokemonButton.classList.add(
			'waves-effect',
			'waves-teal',
			'btn-flat',
			'caught-button'
		);

		const caughtPokemonIcon = document.createElement('i');
		caughtPokemonIcon.classList.add('material-icons', 'check-icon');
		caughtPokemonIcon.innerText = 'check';

		const seenPokemonButton = document.createElement('button');
		seenPokemonButton.classList.add(
			'waves-effect',
			'waves-teal',
			'btn-flat',
			'seen-button'
		);

		const seenPokemonIcon = document.createElement('i');
		seenPokemonIcon.classList.add('material-icons', 'eye-icon');
		seenPokemonIcon.innerText = 'remove_red_eye';

		// appending elements
		cardImageContainer.append(pokemonImg);
		caughtPokemonButton.append(caughtPokemonIcon);
		seenPokemonButton.append(seenPokemonIcon);
		cardDetailsContainer.append(caughtPokemonButton, seenPokemonButton);
		// cardDetailsContainer.append(pokemonDetailsLink);
		cardContentContainer.append(pokemonName, cardDetailsContainer);
		modalTrigger.append(cardImageContainer);
		cardContainer.append(modalTrigger, cardContentContainer);
		gridContainer.append(cardContainer);
		mainContainer.append(gridContainer);
		pokemonContainer.append(mainContainer);

		// pokemon modal popup
		const modalContainer = document.createElement('div');
		modalContainer.id = `${pokemonInfo.id}modal`;
		modalContainer.classList.add('modal');

		const modalContentContainer = document.createElement('div');
		modalContentContainer.classList.add('modal-content');

		const modalHeader = document.createElement('h4');
		modalHeader.innerText = `${pokemonInfo.name.english} Status`;

		const pokemonStatus = pokemonInfo.base;
		for (const status in pokemonStatus) {
			const progressBarContainer = document.createElement('div');
			progressBarContainer.classList.add('progress');

			const progressBar = document.createElement('div');
			progressBar.classList.add('determinate');

			const progressBarTitle = document.createElement('p');
			progressBarTitle.innerText = `${status}: ${pokemonStatus[status]}`;
			progressBar.style.width = `${pokemonStatus[status]}`;

			progressBarContainer.append(progressBar);
			modalContentContainer.append(progressBarTitle, progressBarContainer);
		}

		// appending elements
		modalContentContainer.prepend(modalHeader);
		modalContainer.append(modalContentContainer);
		mainContainer.append(modalContainer);
	};

	// pokemon search
	const searchBar = document.querySelector('.autocomplete');
	searchBar.addEventListener('change', (event) => {
		const pokemonName = event.target.value;

		const searchButton = document.querySelector('.search-button');
		searchButton.addEventListener('click', async (event) => {
			event.preventDefault();
			const response = await fetch(`/search/${pokemonName}`);
			const pokemonInfo = await response.json();

			if (pokemonInfo[0]) {
				// removing existing DOM elements
				const mainContainer = document.querySelector('.row');
				mainContainer.remove();
				createPokemonCard(pokemonInfo[0]);
			} else {
				console.log('Not valid pokemon name');
				return;
			}
		});
	});

	// initializing search bar input
	const searchResults = async () => {
		try {
			const response = await fetch('/search');
			const pokemons = await response.json();
			return pokemons;
		} catch (error) {
			console.log('error', error);
		}
	};
	M.Autocomplete.init(searchBar, {
		data: await searchResults(),
	});

	// initializing pokemon details modal
	const pokemonDetailsModal = document.querySelectorAll('.modal');
	M.Modal.init(pokemonDetailsModal);
});
