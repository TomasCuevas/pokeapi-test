"use client";
import { useState } from "react";

//* CONSTS *//
import { BASE_IMAGE_URL } from "@/consts/consts";

//* COMPONENTS *//
import { PokemonCard } from "@/components/pokemon-card";
import { PokemonsSearchedContainer } from "@/components/pokemons-searched-container";
import { SelectPokemonTypeSection } from "@/components/select-pokemon-type-section";

//* HOOKS *//
import { usePokemonsByPage, useSeachPokemon } from "@/hooks/use-pokemons";

export const PokemonsContainer = () => {
  const [query, setQuery] = useState("");

  const { pokemons, increasePage, isLoading } = usePokemonsByPage();
  const { results, onClear } = useSeachPokemon({ query });

  return (
    <>
      <SelectPokemonTypeSection />

      <section className="mt-10 flex flex-col justify-center gap-2">
        <h3 className="text-xl font-bold">Buscar pokemon</h3>
        <div className="flex items-center gap-5">
          <input
            type="text"
            value={query}
            className="text-black rounded-md w-full py-2 px-4 text-lg font-medium"
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            className="bg-white rounded-full p-2"
            onClick={() => {
              setQuery("");
              onClear();
            }}
          >
            ✖️
          </button>
        </div>
      </section>

      <PokemonsSearchedContainer results={results} />

      <section style={{ display: results.length > 1 ? "none" : "block" }}>
        <h3 className="font-bold mb-5 text-xl">Lista de todos los pokemones</h3>
        <div className="grid justify-center items-center grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
          {pokemons.map((pokemon, index) => (
            <PokemonCard
              key={`pokemon-${index + 1}`}
              id={index + 1}
              image={`${BASE_IMAGE_URL}/${index + 1}.png`}
              name={pokemon.name}
            />
          ))}
        </div>

        <button
          className="mx-auto bg-white text-xl w-full text-black font-semibold hover:scale-[1.02]  my-10 duration-200 py-2 rounded-xl"
          disabled={isLoading}
          onClick={() => {
            if (isLoading) return;
            increasePage();
          }}
        >
          {isLoading ? "Cargando..." : "Obtener más"}
        </button>
      </section>
    </>
  );
};
