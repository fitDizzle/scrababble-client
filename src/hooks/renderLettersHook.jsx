import Letter from "../components/letters/letter";

export const useRenderLetters = (tiles) => {
  return Array.isArray(tiles)
    ? tiles.map((letter, i) => {
        return (
          <Letter id={letter.id} key={i} value={letter.tile}>
            {letter.tile.toUpperCase()}
            <p className="letter-points unselectable">{letter.value}</p>
          </Letter>
        );
      })
    : null;
};
