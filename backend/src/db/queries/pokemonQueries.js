const pool = require('../dbConfig');

async function fetchAllPokemons() {
    const[rows] = await pool.query('SELECT * FROM Pokemons');
    return rows;
}

async function searchPokemonByName(name) {
    const [rows] = await pool.query(`
    SELECT P.id, P.name, P.description, P.imgUrl, 
           CASE WHEN UFP.pokemon_id IS NOT NULL THEN true ELSE false END as favorite
    FROM Pokemons P
    LEFT JOIN User_Favorite_Pokemon UFP ON P.id = UFP.pokemon_id AND UFP.user_id = 1
    WHERE P.name LIKE ?;
    `, [`%${name}%`]);
  
    return rows;
}

  async function toggleFavoriteStatus(pokemonId) {
    try {
      const [existingFavorite] = await pool.query('SELECT * FROM User_Favorite_Pokemon WHERE user_id = 1 AND pokemon_id = ?', [pokemonId]);

      if (existingFavorite.length > 0) {
        await pool.query('DELETE FROM User_Favorite_Pokemon WHERE user_id = ? AND pokemon_id = 1', [pokemonId]);
        return;
      } else {
        await pool.query('INSERT INTO User_Favorite_Pokemon (user_id, pokemon_id) VALUES (1, ?)', [pokemonId]);
        return;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function searchPokemonByType(type) {
    console.log('about to search by type');
    const [rows] = await pool.query(`
    SELECT P.id, P.name, P.description, P.imgUrl, 
           CASE WHEN UFP.pokemon_id IS NOT NULL THEN true ELSE false END as favorite
    FROM Pokemons P
    JOIN Pokemon_Type PT ON P.id = PT.pokemon_id
    JOIN Types T ON PT.type_id = T.id
    LEFT JOIN User_Favorite_Pokemon UFP ON P.id = UFP.pokemon_id AND UFP.user_id = 1
    WHERE T.name = ?;
    `, [type]);
  
    return rows;
}

async function searchSuggestions(query, criteria) {
    let results = [];
    switch (criteria) {
        case 'NAME':
            const [pokemonRows] = await pool.query('SELECT name FROM Pokemons WHERE name LIKE ?', [`${query}%`]);
            results = pokemonRows.map((row) => row.name);
            break;

        case 'TYPE':
            const [typeRows] = await pool.query('SELECT name FROM Types WHERE name LIKE ?', [`${query}%`]);
            results = typeRows.map((row) => row.name);
            break;

        default:
            throw new Error('Invalid criteria');
    }
    return results;
}
async function randomPokemons() {
    const numberOfRandomPokemons = 5;
    const randomOffset = Math.floor(Math.random() * numberOfRandomPokemons);

    const query = `
        SELECT P.id, P.name, P.description, P.imgUrl, IFNULL(UFP.user_id = 1, false) AS favorite
        FROM Pokemons AS P
        LEFT JOIN User_Favorite_Pokemon AS UFP ON P.id = UFP.pokemon_id AND UFP.user_id = 1
        ORDER BY RAND()
        LIMIT ?;
    `;
    const [rows] = await pool.query(query, [numberOfRandomPokemons]);
    return rows;
}

module.exports = {
    fetchAllPokemons,
    searchPokemonByName,
    searchSuggestions,
    searchPokemonByType,
    toggleFavoriteStatus,
    randomPokemons,
}
