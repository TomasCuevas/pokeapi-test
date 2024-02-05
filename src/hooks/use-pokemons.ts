import { useEffect, useState } from "react";

//* CONSTS *//
import { API_URL } from "../consts/consts";

//* SERVICES *//
import { getPokemonsByPageService } from "@/services/pokemon.services";

//* INTERFACES *//
import { IPokemon, IPokemonResponse } from "@/interfaces/pokemon.interfaces";

//! USE POKEMONS
export const usePokemonsByPage = () => {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  const increasePage = () => setPage((prev) => prev + 1);

  const fetchNextPage = async () => {
    if (pokemons.length === page * 20) return;

    setIsLoading(true);
    const newPokemons = await getPokemonsByPageService({ page });
    setPokemons((prev) => [...prev, ...newPokemons]);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchNextPage();
  }, [page]);

  return {
    // props
    pokemons,
    isLoading,

    // methods
    increasePage,
  };
};

//! USE SEARCH POKEMON
interface USPProps {
  query: string;
}

export const useSeachPokemon = ({ query }: USPProps) => {
  const [results, setResults] = useState<{ id: number; name: string }[]>([]);
  const [visible, setVisible] = useState(false);
  const [allPokemons, setAllPokemons] = useState<IPokemon[]>();

  const getPokemonSearcher = async () => {
    if (query.length < 1) {
      setResults([]);
      setVisible(false);
      return;
    }

    if (!allPokemons) {
      const response = await fetch(`${API_URL}/pokemon?limit=10000`);
      const body: IPokemonResponse = await response.json();
      setAllPokemons(body.results);
    }

    let allIncludes: any = [];
    allPokemons?.forEach((pokemon) => {
      if (
        pokemon.name.includes(query.toLowerCase()) &&
        allIncludes.length < 10
      ) {
        const name = pokemon.name;
        const id = Number(pokemon.url.split("/").at(-2)!);
        allIncludes.push({ name, id });
      }
    });

    setResults(allIncludes);
    setVisible(true);
  };

  const onClear = () => {
    setVisible(false);
    setResults([]);
  };

  useEffect(() => {
    getPokemonSearcher();
  }, [query]);

  return {
    // props
    results,
    visible,

    // methods
    onClear,
  };
};
