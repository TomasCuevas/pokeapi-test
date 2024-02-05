import Link from "next/link";

//* CONSTS *//
import { TYPES_OF_POKEMONS } from "@/consts/consts";

export const SelectPokemonTypeSection: React.FC = () => {
  return (
    <section className="mt-10">
      <h3 className="font-bold text-xl">Seleccionar por tipo de Pokemon</h3>
      <ul className="flex flex-wrap gap-2 gap-y-2 mt-3">
        {TYPES_OF_POKEMONS.map(({ type }, index) => (
          <li
            key={`${type}-${index + 1}`}
            className="rounded-3xl bg-slate-800/50 hover:underline underline-offset-2 duration-200 hover:bg-slate-800 capitalize text-white"
          >
            <Link
              href={`/${type}`}
              className="px-4 py-1 block text-sm sm:text-lg"
            >
              {type}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
