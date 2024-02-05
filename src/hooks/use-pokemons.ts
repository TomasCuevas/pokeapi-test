import { useEffect, useState } from "react";

//* SERVICES *//
import { getPokemonsByPageService } from "@/services/pokemon.services";

//* INTERFACES *//
import { IPokemon } from "@/interfaces/pokemon.interfaces";

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
