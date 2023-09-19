/**
 * The SQL queries of Pokemon.
 */
export default {
  /**
   * Gets all entites.
   */
  getAll: 'SELECT * FROM pokemon',

  /**
   * Inserts a new Pokemon and returns its ID.
   */
  insertPokemon: 'INSERT INTO pokemon(name) VALUES ($1) RETURNING id',

  /**
   * Inserts a new ability to an existing Pokemon with the ability size.
   */
  insertPokemonAbility:
    'INSERT INTO pokemon_abilities("pokemonId", "abilityId", size) VALUES ($1, $2, $3)',
};
