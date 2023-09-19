import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";

import axios from "axios";
import { LikingService, PokemonRepository } from "../repositories/interfaces";
import PokemonDTO from "../dtos/PokemonDTO";


@injectable()
class PokemonRepositoryImpl implements PokemonRepository {
  @inject(TYPES.ApiBaseUrl) private _apiUrl: string | any;

  async getRandomPokemons(): Promise<PokemonDTO[]> {
    try {
      const response = await axios.get(`${this._apiUrl}/pokemons/random`);
      return response.data.pokemons;
    } catch (error) {
      console.error('Error fetching pokemon data:', error);
      throw error;
    }
  }
}

@injectable()
class LikingServiceImpl implements LikingService {
  @inject(TYPES.ApiBaseUrl) private _apiUrl: string | any;

  async toggleFavoriteStatus(pokemonId: number): Promise<void> {
    try {
      const headers = new Headers();
        const user = localStorage.getItem('user');
        const password = localStorage.getItem('password');

        if (user !== null) {
            headers.append('user', user);
        }
        if (password !== null) {
            headers.append('password', password);
        }
        headers.append('Content-Type', 'application/json');

      const payload = {
        pokemonId: pokemonId,
      };
      const response = await fetch(`${this._apiUrl}/pokemon/toggle-favorite`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(payload),
      });

      if (response.status === 200) {
        console.log('Favorite status updated in the backend');
        return;
      } else {
        console.log('Failed to update favorite status in the backend');
        throw new Error('Failed to update favorite status');
      }
    } catch (error) {
      console.error('Error updating favorite status for pokemon:', error);
      throw error;
    }
  }
}

export { PokemonRepositoryImpl, LikingServiceImpl };
