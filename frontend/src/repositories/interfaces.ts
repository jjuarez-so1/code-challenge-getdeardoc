import PokemonDTO from "../dtos/PokemonDTO";

export interface PokemonRepository {
  getRandomPokemons(): Promise<PokemonDTO[]>;
}

export interface LikingService {
  toggleFavoriteStatus(pokemonId: number): Promise<void>;
}
