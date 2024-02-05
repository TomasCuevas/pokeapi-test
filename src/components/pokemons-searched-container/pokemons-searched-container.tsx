//* CONSTS *//
import { BASE_IMAGE_URL } from "@/consts/consts";

//* COMPONENTS *//
import { PokemonCard } from "@/components/pokemon-card";

interface Props {
  results: { name: string; id: number }[];
}

export const PokemonsSearchedContainer: React.FC<Props> = ({ results }) => {
  return (
    <section className="mt-10 grid justify-center items-center grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
      {results.map(({ id, name }) => (
        <PokemonCard
          key={`pokemon-${id}`}
          id={id}
          image={`${BASE_IMAGE_URL}/${id}.png`}
          name={name}
        />
      ))}
    </section>
  );
};
