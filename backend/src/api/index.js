const express = require('express');
const router = express.Router();
const { registerUser } = require('./users/userController');
const authMiddleware = require('./middleware/authMiddleware');

const { fetchAllPokemons,
        searchPokemonByName,
        searchSuggestions,
        searchPokemonByType,
        toggleFavoriteStatus,
        randomPokemons } = require('../db/queries/pokemonQueries');


/**
 * Healtcheck for the API
 */
router.get('/', (req, res) => {
  res.json({
    message: 'API is up and running',
  });
});


/**
 * Search pokemons either by name or by type
 */
router.get('/search', async (req, res) => {
  const { name, type } = req.query;

  try {
    let matchingPokemons;

    if (name) {
      matchingPokemons = await searchPokemonByName(name);
    } else if (type) {
      matchingPokemons = await searchPokemonByType(type);
    } else {
      return res.status(400).json({ error: 'Please provide a valid name or type.' });
    }

    const response = {
      pokemons: matchingPokemons,
      total: matchingPokemons.length,
    };
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/**
 * Retrieve 5 random pokemons
 */
router.get('/pokemons/random', async (req, res) => {
  try {
    const pokemons = await randomPokemons();
    const response = {
      pokemons: pokemons,
      total: pokemons.length,
    }
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * Retrieve suggestions for typeahead
 */
router.get('/suggestions', async (req, res) => {
  const { query, criteria } = req.query;
  try {
    const matchingResults = await searchSuggestions(query, criteria);
    res.json(matchingResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * Toggle the favorite or not status from a pokemon
 */
router.put('/pokemon/toggle-favorite', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const { pokemonId } = req.body;

    if (typeof pokemonId !== 'number') {
      return res.status(400).json({ error: 'Invalid input. Please provide a valid Pokemon ID and like status.' });
    }

    toggleFavoriteStatus(pokemonId, userId)
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * Endpoint for testing purposes, it emulates a protected enpoint, it should be deleted
 */
router.get('/protected-endpoint', authMiddleware, (req, res) => {
  console.log('req.user', req.user);
  res.json({ message: 'This is a protected endpoint. You are authorized.' });
});

/**
 * Endpoint to authenticate
 */
router.post('/authenticate', authMiddleware, (req, res) => {
  res.json({id: req.user.id});
});

router.post('/register', registerUser);

module.exports = router;
