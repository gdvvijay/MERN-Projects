import filledStar from "../assets/filledStar.png";
import emptyStar from "../assets/emptyStar.png";

export default function UseRating({ item }) {
  return (
    <>
      {Array.from({ length: Math.floor(parseInt(item.rating)) }).map(() => (
        <img
          key={crypto.randomUUID()}
          src={filledStar}
          alt="colored star"
          className=" h-full w-full"
        />
      ))}
      {Array.from({ length: 5 - Math.floor(parseInt(item.rating)) }).map(() => (
        <img
          key={crypto.randomUUID()}
          src={emptyStar}
          alt="not colored star"
          className="h-full w-full"
        />
      ))}
    </>
  );
}
