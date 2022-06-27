const express = require('express');
const {Pokemon, Type} = require('../db');
const { getPokemonDetail, getAllPokemon } = require('./functions');

const router = express.Router();

// ******************** GET/pokemons?name="..." --> router.get('/pokemons', async (req, res) ... ************************
// GET pokemon by name, in main route beacuse or same info (if name intake)
// NAME as Query parameter by URL (pokeapi or created)
// If not pokemon found show error message
router.get('/', async (req, res) => {
    //const {name} = req.query;
    //const allPokesName = await getAllPokemon();
    try {
        const {name} = req.query;
        if (name) {
            let poke = allPokesName.filter(e => e.name.toLowerCase() === name.toLowerCase());
            poke.length ? res.status(200).send(poke) : res.status(404).send('Pokemon not found'); 
        } else {
            let pokemons = await getAllPokemon();
            return res.status(200).send(pokemons);
        }
    } catch (e) {
        console.log(e);
    }
});
// ******************* GET /pokemon/{idPokemon} --> router.get('/pokemons:id', async (req, res) ... ********************* 
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const allPokesId = await getAllPokemon(); 
    try {
        if(id) {
            let pokemonById = allPokesId.filter(e => e.id == id);
            pokemonById.length ? res.status(200).send(pokemonById) : res.status(404).send('Pokemon not found')
        } 
    } catch (e) {
        console.log(e);
    }
});
// ****************** POST/pokemon -->  router.post('/pokemons', async (req, res)... ************************************
router.post('/', async (req, res) => {
    const {name, hp, attack, defense, speed, height, weight, img, types} = req.body;
    try {
        if(name) {
            const allPoke = await getAllPokemon();
            const isPoke = allPoke.find(e => e.name === name.toLowerCase());
            if (!isPoke) {
                const pokemon = await Pokemon.create({
                        name,
                        hp,
                        attack,
                        defense,
                        speed,
                        height,
                        weight,
                        img 
                });
            
                const typeDb = await Type.findAll({
                    where: {
                        name: types,
                    }
                });
                pokemon.addType(typeDb);
                return res.status(201).send(pokemon);
            }
            return res.status(404).send('Pokemon name already exist')
        } 
        if(!name) return res.status(404).send('Pokemon name is obligatory');
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;