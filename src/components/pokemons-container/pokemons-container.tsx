"use client";

//* CONSTS *//
import { BASE_IMAGE_URL } from "@/consts/consts";

//* COMPONENTS *//
import { SelectPokemonTypeSection } from "@/components/select-pokemon-type-section";
import { PokemonCard } from "@/components/pokemon-card";

//* HOOKS *//
import { usePokemonsByPage } from "@/hooks/use-pokemons";

export const PokemonsContainer = () => {
  const { pokemons, increasePage, isLoading } = usePokemonsByPage();

  return (
    <>
      <SelectPokemonTypeSection />

      <section className="mt-10">
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
      </section>

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
    </>
  );
};
