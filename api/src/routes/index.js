const { Router } = require('express');
// import all routers;
// Example: const authRouter = require('./auth.js');
const router = Router();

// Configure routers
// Example: router.use('/auth', authRouter);
const {Pokemon, Type} = require('../db')
const axios = require('axios')

// ******************************************* Get API info / pokemons: *********************************************************
// Get API data; from Pokemon URL get data for main Route (name, img, type).
const getApiInfo = async () => {
    try {
        let url = 'https://pokeapi.co/api/v2/pokemon/';
        const pokemonst = [];
        do {
            const info = await axios.get(url);
            const pokemonstApi = info.data;
            const auxPokemonst = pokemonstApi.results.map(e => {
                return {
                    name: e.name,
                    url: e.url,
                }
            })
            pokemonst.push(...auxPokemonst);
            url = pokemonstApi.next;
        } while (url != null && pokemonst.length < 40); //Set Pokemons limit
        // console.log(pokemonst);
        const pokesWithData = await Promise.all(pokemonst.map(async e => {
            const pokemon = await axios.get(e.url);
            return {
                id: pokemon.data.id,
                name: pokemon.data.name,
                img: pokemon.data.sprites.front_default,
                types: pokemon.data.types.map(e => e.type.name),
            }
        }));
        // console.log(pokesWithData);
        return pokesWithData;
    } catch (e) {
        console.log(e);
    }
}
getApiInfo()

//GET from API specified Pokemon by PARAMS (ID)(includes detailed data for detailed route)
async function getPokemonById(id) {
    try {
        const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await apiData.data;
        const pokemonData = {
            id: data.id,
            name: data.name,
            types: data.types.map(e => e.type.name),
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
            img: data.sprites.front_default,
        };
        return pokemonData;
    } catch (e) {
        console.log(e);
    }
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
    })
}

// ******************************************* Concatenate API + DB *****************************************************
// GET all Pokemons, from API + DB.
const getAllPokemon = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allPokemon = apiInfo.concat(dbInfo);
    return allPokemon;
}

// *************************************** GET /pokemon/{idPokemon} *****************************************************
router.get('/pokemon:id', async (req, res) => {  
    try {
        const {id} = req.params;
        if(id) {
            const pokemons = await getAllPokemon();
            const pokemonFind = pokemons.find(e => e.id == id);
            // console.log(pokemonFind);
            if (pokemonFind) {
                const pokemonById = await getPokemonById(pokemonFind.id);
                return res.status(200).send(pokemonById);
            } else {
                return res.status(404).send('Pokémon not found');
            }
        }
    } catch (e) {
        console.log(e);
    }
});

// ************************************** GET/pokemons?name="..."********************************************************
// GET pokemon by name, in main route beacuse or same info (if name intake)
// NAME as Query parameter by URL (pokeapi or created)
// If not pokemon found show error message

router.get('/pokemon', async (req, res) => {
    try {
        const {name} = req.query;
        const pokemons = await getAllPokemon();
        if (name) {
            const pokemonDataComp = [];
            const pokemonName = pokemons.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            if (pokemonName.length) {
                for (const pokemon of pokemonName) {
                    const pokemonNameData = await getPokemonById(pokemon.id);
                    pokemonDataComp.push(pokemonNameData);
                }
                return res.status(200).send(pokemonDataComp);
            } else {
                return res.status(404).send('Pokémon not found');
            }
        } 
        return res.status(200).send(pokemons);
    } catch (e) {
        console.log(e);
    }
});




// ********************************************* GET/type ********************************************************
router.get('/type', async (req, res) => {
    try {
        const apiType = await axios.get('https://pokeapi.co/api/v2/type'); // Get API info
        const apiTypeInfo = apiType.data;
        const types = apiTypeInfo.results.map(e => e.name); // map info
        types.forEach(type => { // Once info is mapped then findOrcreate wihtin the model & save model TYPES
            Type.findOrCreate({
                where: { // where name is the element 
                    name: type,
                }
            });
        });
        const allTypes = await Type.findAll(); //Search all TYPES in DB
        return res.status(200).send(allTypes); // Return all TYPES
    } catch (e) {
        console.log(e);
    };
});


// ******************************************* POST/pokemon *****************************************************
router.post('/pokemon', async (req, res) => {
    try {
        const {name, hp, attack, defense, speed, height, weight, typeName} = req.body;
        const pokemon = await Pokemon.create({
                name,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
        });
    
        const typeDb = await Type.findAll({
            where: {
                name: typeName,
            }
        });
        pokemon.addType(typeDb);
        res.status(200).send('Success: Pokemon added');
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
