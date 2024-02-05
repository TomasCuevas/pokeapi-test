import { NextPage } from "next";
import Link from "next/link";

//* SERVICES *//
import { getPokemonsByTypeService } from "@/services/pokemon.services";

//* COMPONENTS *//
import { SelectPokemonTypeSection } from "@/components/select-pokemon-type-section";
import { PokemonCard } from "@/components/pokemon-card";

//* PROPS *//
interface Props {
  params: { type: string };
}

const PokemonByTypePage: NextPage<Props> = async ({ params: { type } }) => {
  const allPokemonsByType = await getPokemonsByTypeService({ type });

  return (
    <>
      <section className="mt-10 mb-2 flex">
        <Link
          href="/"
          className="duration-200 group flex px-4 py-1 hover:-translate-x-2 bg-white rounded-xl"
        >
          <h3 className="px-4 py-2 text-black font-semibold">
            Volver al menu principal
          </h3>
        </Link>
      </section>

      <SelectPokemonTypeSection />

      <section className="my-10">
        <h3 className="font-bold mb-5 text-xl">Pokemones de tipo: {type}</h3>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
          {allPokemonsByType.map(({ id, img, name }) => (
            <PokemonCard
              key={`${name}-${id}`}
              id={Number(id)}
              image={img}
              name={name}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default PokemonByTypePage;
