//* PROPS *//
interface Props {
  name: string;
  image: string;
  id: number;
}

export const PokemonCard: React.FC<Props> = ({ id, image, name }) => {
  return (
    <article className="mx-auto cursor-pointer hover:scale-105 duration-200 w-[150px] md:w-[200px] aspect-square flex justify-center p-2 items-center flex-col border rounded-2xl border-slate-500 bg-slate-800 gap-2">
      <img src={image} alt={name} className="w-20 aspect-square" />
      <h2 className="capitalize">{name}</h2>
    </article>
  );
};
