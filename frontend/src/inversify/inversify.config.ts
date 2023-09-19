import { Container } from "inversify";
import { TYPES } from "./types";
import { PokemonRepositoryImpl, LikingServiceImpl } from "./entities";
import { API_BASE_URL } from "../constants/constants";
import { LikingService, PokemonRepository } from "../repositories/interfaces";

const myContainer = new Container();
myContainer.bind<PokemonRepository>(TYPES.PokemonRepository).to(PokemonRepositoryImpl);
myContainer.bind<LikingService>(TYPES.LikingService).to(LikingServiceImpl);

myContainer.bind<string>(TYPES.ApiBaseUrl).toConstantValue(API_BASE_URL);

export { myContainer };
