
window.onload = async () => {
    showLoading();
    try {

        await loadPokemons(1);
    hideLoading();
    } catch (error) {
        console.log(error);
    }
};


const nextButton = document.getElementById('next-page');
const backButton = document.getElementById('previous-page');

nextButton.addEventListener('click', loadNextPage);
backButton.addEventListener('click', loadPreviousPage);

async function loadPokemons(currentPage) {
    const mainContent = document.querySelector('.main-content');
    mainContent.style.height = '100%';
    mainContent.innerHTML = '';

    try {

        const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=23&offset=${(currentPage - 1) * 23}`;
        const response = await fetch(apiUrl);
        const responseJson = await response.json();

        for (const pokemon of responseJson.results) {
            const pokemonDetails = await getPokemonDetails(pokemon.url);

            const card = document.createElement('div');
            card.className = 'card';

            const pokemonName = document.createElement('span');
            pokemonName.className = 'name';
            pokemonName.style.fontFamily = 'Outfit7, sans-serif';
            pokemonName.style.color = '#000000d2';
            pokemonName.innerText = `${pokemon.name}`;

            const pokemonId = document.createElement('span');
            pokemonId.className = 'id';
            pokemonId.style.color = '#000000d2';
            pokemonId.innerText = `#${pokemonDetails.id}`;

            const cardDesc = document.createElement('div');
            cardDesc.className = 'card-description';

            const pokemonPhoto = document.createElement('div');
            pokemonPhoto.className = 'img-p';

            const gifUrl = `./assets/showdown/${pokemonDetails.id}.gif`;

            if (await imageExists(gifUrl)) {
                pokemonPhoto.style.background = `url(${gifUrl})`;
            } else {
                pokemonPhoto.style.background = `url(${pokemonDetails.sprites.front_default})`;
            }

            pokemonPhoto.style.backgroundSize = '60px auto';
            pokemonPhoto.style.backgroundRepeat = 'no-repeat';
            pokemonPhoto.style.backgroundPosition = '50% 50%';

            const typesString = pokemonDetails.types.map((type) => type.type.name);

            const pokemonTypes = document.createElement('div');
            pokemonTypes.className = 'types';
            pokemonTypes.style.fontFamily = 'Outfit7, sans-serif';
            pokemonTypes.innerText = `${translateType(typesString)}`;

            const details = document.createElement("div");
            details.className = 'details';

            const detailsPoke = document.createElement("div");
            detailsPoke. className = 'details-p';


            const pokemonWeight = document.createElement('span');
            pokemonWeight.className = 'peso';
            pokemonWeight.style.fontFamily = 'Outfit7, sans-serif';
            pokemonWeight.innerText = `Peso: ${pokemonDetails.weight}.0 kg`;
            pokemonWeight.style.fontSize = '12px';

            const pokemonHeight = document.createElement('span');
            pokemonHeight.className = 'altura';
            pokemonHeight.style.fontFamily = 'Outfit7, sans-serif';
            pokemonHeight.innerText = `Altura: ${pokemonDetails.height} `;
            pokemonHeight.style.fontSize = '12px';

            const pokemonAbilities = document.createElement('span');
            pokemonAbilities.className = 'habilidades';
            pokemonAbilities.style.fontFamily = 'Outfit7, sans-serif';
            const abilities = pokemonDetails.abilities.map(ability => ability.ability.name);
            pokemonAbilities.innerText = `Habilidades: ${abilities.join(', ')}`;
            pokemonAbilities.style.fontSize = '12px';

            const pokemonShiny = document.createElement('div');
            pokemonShiny.className = 'img-p-shiny';

            const gifUrlShiny = `./assets/showdown/shiny/${pokemonDetails.id}.gif`;

            pokemonShiny.innerHTML = 'Shiny:'
            pokemonShiny.style.fontFamily = 'Outfit7, sans-serif';
            pokemonShiny.style.height = '200px'



            if (await imageExists(gifUrl)) {

                pokemonShiny.style.background = `url(${gifUrlShiny})`;
            } else {
                pokemonShiny.style.background = `url(${pokemonDetails.sprites.front_default})`;
            }
            pokemonShiny.style.padding =  '20px';
            pokemonShiny.style.backgroundSize = '60px auto';
            pokemonShiny.style.backgroundRepeat = 'no-repeat';
            pokemonShiny.style.backgroundPosition = '50% 50%';

            const pokemonMoves = document.createElement('div');
            pokemonMoves.className = 'golpes';

            const movesList = document.createElement('ul');
            movesList.innerText = 'Golpes:'
            movesList.style.fontFamily = 'Outfit7, sans-serif';
            movesList.style.fontSize = '15px';

            pokemonDetails.moves.forEach(move => {
            const moveItem = document.createElement('li');
            moveItem.innerText = move.move.name;
            moveItem.style.fontFamily = 'Outfit7, sans-serif';
            moveItem.style.fontSize = '10px';
            movesList.appendChild(moveItem);
            });

            pokemonMoves.appendChild(movesList);

 


            switch (typesString[0]) {

                case "grass":
                    card.style.backgroundColor = '#76be5d';
                    break;

                case "bug":
                    card.style.backgroundColor = '#a8b921';
                    break;

                case "fire":
                    card.style.backgroundColor = '#fe4523';
                    break;

                case "water":
                    card.style.backgroundColor = '#3298fe';
                    break;

                case "normal":
                    card.style.backgroundColor = '#babca9';
                    break;

                case "poison":
                    card.style.backgroundColor = '#994488';
                    break;

                case "electric":
                    card.style.backgroundColor = '#e3ce28';
                    break;

                case "flying":
                    card.style.backgroundColor = '#6599ff';
                    break;

                case "fairy":
                    card.style.backgroundColor = '#ec4487';
                    break;

                case "fighting":
                    card.style.backgroundColor = '#ec4487';
                    break;

                case "ground":
                    card.style.backgroundColor = '#dcba55';
                    break;

                case "rock":
                    card.style.backgroundColor = '#bbaa66';
                    break;

                case "dragon":
                    card.style.backgroundColor = '#7d66f1';
                    break;

                case "steel":
                    card.style.backgroundColor = '#a2a2b3';
                    break;

                case "dark":
                    card.style.backgroundColor = '#6b5346';
                    break;

                case "ghost":
                    card.style.backgroundColor = '#5454a8';
                    break;

                case "ice":
                    card.style.backgroundColor = '#75dbfc';
                    break;

                case "psychic":
                    card.style.backgroundColor = '#ff5699';
                    break;

                default:
                    card.style.backgroundColor = '#FFF'
            }

            function getGradientColors(types) {
                const colorMap = {
                    'fire': '#fe4422',
                    'grass': '#7bc761',
                    'poison': '#a94499',
                    'flying': 'lightblue',
                    'water': '#3197fd',
                    'normal': 'white',
                    'electric': '#e1c328',
                    'fairy': '#ec4487',
                    'fighting': '#ec4487',
                    'dragon': '#7d66f1',
                    'ice': '#75dbfc',
                    'psychic': '#ff5699',
                    'rock': '#bbaa66',
                    'bug': '#a8b921',
                    'ghost': '#5454a8',
                    'steel': '#a2a2b3',
                    'dark': '#6b5346',
                    'ground': '#dcba55',
                };

                const colors = types.map(type => colorMap[type.toLowerCase()]).join(', ');
                return `linear-gradient(45deg, ${colors})`;
            }



            if (typesString.length === 1) {
                const typeColor = getGradientColors(typesString);
                card.style.backgroundImage = typeColor;
            } else if (typesString.length === 2) {
                const gradientColors = getGradientColors(typesString);
                card.style.backgroundImage = gradientColors;
            }

            mainContent.appendChild(card);
            card.appendChild(pokemonId);
            card.appendChild(pokemonName);
            card.appendChild(cardDesc)
            cardDesc.appendChild(pokemonPhoto);
            cardDesc.appendChild(pokemonTypes);
            cardDesc.appendChild(details);
            details.appendChild(detailsPoke);
            detailsPoke.appendChild(pokemonWeight);
            detailsPoke.appendChild(pokemonHeight);
            detailsPoke.appendChild(pokemonAbilities);
            detailsPoke.appendChild(pokemonShiny);
            detailsPoke.appendChild(pokemonMoves);
        }



        backButton.style.visibility = currentPage > 1 ? "visible" : "hidden"
        renderPagination(currentPage, Math.ceil(responseJson.count / 23));

    } catch (error) {
        alert('Erro ao carregar os dados da api', error)
    }
}

function renderPagination(currentPage, totalPages) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    
    const backButton = document.createElement('button');
    backButton.innerText = 'Previous Page';
    backButton.addEventListener('click', async() => {
        if (currentPage > 1) {
            showLoading();
            await loadPokemons(currentPage - 1);
            hideLoading();
        }
    });
    paginationContainer.appendChild(backButton);

    
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.addEventListener('click', async() => {;
        showLoading();
        await loadPokemons(i);
        hideLoading();
        });

        paginationContainer.appendChild(pageButton);
    }

    
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next Page';
    nextButton.addEventListener('click', async () =>  {
  
        if (currentPage < totalPages) {
            showLoading();
            await loadPokemons(currentPage + 1);
            hideLoading();
        }

    });
    paginationContainer.appendChild(nextButton);
}

async function imageExists(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

function translateType(pokemonTypes) {
    const tipos = {
        fire: "Fogo",
        grass: "Planta",
        poison: "Venenoso",
        bug: "Inseto",
        flying: "Voador",
        normal: "Normal",
        water: "Agua",
        electric: "Eletrico",
        ground: "Terra",
        fairy: "Fada",
        fighting: "Lutador",
        rock: "Pedra",
        psychic: "Psiquico",
        steel: "Aco",
        ice: "Gelo",
        dragon: "Dragao",
        dark: "Sombrio",
        ghost: "Fantasma",
    };
    return pokemonTypes.map(type => tipos[type.toLowerCase()] || type).join(', ');
}


async function getPokemonDetails(url) {
    const response = await fetch(url);
    return await response.json();
}

function showLoading() {
    document.getElementById('loading-overlay').style.display = 'flex';
    document.getElementsByClassName('main-content')[0].style.visibility = 'hidden';

}

function hideLoading() {
    document.getElementById('loading-overlay').style.display = 'none';
    document.getElementsByClassName('main-content')[0].style.visibility = 'visible';

}


