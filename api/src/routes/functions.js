const { Pokemon, Type } = require('../db'); 
const axios = require('axios');

// ******************************************* Get API info / pokemons: *********************************************************
const getApiInfo = async () => { // Get API data; from Pokemon URL get data for main Route (name, img, type).
    try {
        let url = 'https://pokeapi.co/api/v2/pokemon/';
        let pokemones = [];
        do {
            let info = await axios.get(url);
            let pokemonesApi = info.data;
            let auxPokemones = pokemonesApi.results.map(e => {
                return {
                    name: e.name,
                    url: e.url,
                }
            })
            pokemones.push(...auxPokemones);
            url = pokemonesApi.next;
        } while (url != null && pokemones.length < 40); //Set Pokemons limit to 40
        // console.log(pokemones);
         let pokesWithData = await Promise.all(pokemones.map(async e => {
            let pokemon = await axios.get(e.url);
            return {
                id: pokemon.data.id,
                name: pokemon.data.name,
                //img: pokemon.data.sprites.other.home.front_default,
                img: pokemon.data.sprites.front_default,
                types: pokemon.data.types.map(e => {
/*                     return ({
                        name: e.type.name,
                        img: `https://typedex.app/types/${e.type.name}.png`,
                    }) */
                    return ({name: e.type.name})
                }),
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[5].base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
            }
        }));
        // console.log(pokesWithData);
        return pokesWithData;
    } catch (e) {
        console.log(e);
    };
};
//GET from API specified Pokemon by PARAMS (ID)(includes data for detailed route)
async function getPokemonDetail(id) {
    try {
        const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await apiData.data;
        const pokemonData = {
            id: data.id,
            name: data.name,
            img: data.sprites.other.home.front_default,
            types: data.types.map(e => {
/*              return ({
                name: e.type.name,
                img: `https://typedex.app/types/${e.type.name}.png`,
            }) */
                return ({name: e.type.name})
            }),
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
        };
        return pokemonData;
    } catch (e) {
        console.log(e);
    };
};



// *************************************************** Get DB info ******************************************************
//GET Pokemons created in DB from POKEMON table; includes TYPE table with Name as attribute.
const getDbInfo = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
};
// ******************************************* Concatenate API + DB *****************************************************
// GET all Pokemons, from API + DB.
const getAllPokemon = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allPokemon = apiInfo.concat(dbInfo);
    return allPokemon;
};

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllPokemon,
    getPokemonDetail
}