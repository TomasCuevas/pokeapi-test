//* CONSTS *//
import { API_URL, BASE_IMAGE_URL } from "@/consts/consts";

//* INTERFACES *//
import {
  IPokemonResponse,
  IPokemon,
  ITypeResponse,
} from "@/interfaces/pokemon.interfaces";

//! GET POKEMONS BY PAGE
interface GPBPProps {
  page: number;
}

export const getPokemonsByPageService = async ({ page = 1 }: GPBPProps) => {
  const PAGE = page * 20;
  const OFFSET = PAGE - 20;

  const response = await fetch(
    `${API_URL}/pokemon?limit=${PAGE}&offset=${OFFSET}`
  );
  const body: IPokemonResponse = await response.json();

  return body.results as IPokemon[];
};

//! GET POKEMONS BY TYPE
interface GPBTProps {
  type: string;
}

export const getPokemonsByTypeService = async ({ type }: GPBTProps) => {
  const response = await fetch(`${API_URL}/type/${type}`);
  const body: ITypeResponse = await response.json();

  const allPokemonsForType = body.pokemon.map((pokemon) => ({
    id: pokemon.pokemon.url.split("/").at(-2)!,
    name: pokemon.pokemon.name,
    img: `${BASE_IMAGE_URL}/${pokemon.pokemon.url.split("/").at(-2)!}.png`,
  }));

  return allPokemonsForType;
};
