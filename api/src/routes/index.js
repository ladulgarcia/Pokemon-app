const { Router } = require('express');
// import all routers;
// Example: const authRouter = require('./auth.js');

const typesRoute = require('./typesRoute');
const pokemonsRoute = require('./pokemonsRoute');

const router = Router();

// Configure routers
// Example: router.use('/auth', authRouter);
router.use('/types', typesRoute);
router.use('/pokemons', pokemonsRoute)


module.exports = router;
