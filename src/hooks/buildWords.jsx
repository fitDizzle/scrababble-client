export const useBuildWordArray = (moves, stateWordsPlayed) => {
  try {
    // console.log("Build word array start", stateWordsPlayed);
    console.log("==================== Build words started =====================================")
    console.log(stateWordsPlayed, "words played wiuthin build words")
    // console.log("Build word", moves);
    let words = [];
    let multipliers = [];
    let x = Math.min(...moves.map((move) => move.parentX));
    let y = Math.max(...moves.map((move) => move.parentY));

    const buildWord_Y = (arr) => {
      if (arr.length > 1) {
        let sorted = arr.sort((a, b) => {
          return b.parentY - a.parentY;
        });
        let word = [];
        let multiplier = [];
        sorted.forEach((move, i, array) => {
          word.push(move.tile);
          multiplier.push(move.multiplier);
          if (i == array.length - 1) {
            if (!stateWordsPlayed.includes(word.join(""))) {
              if (word.length > 1) {
                words.push(word.join(""));
                multipliers.push(multiplier.join("-"));
              }
              return;
            }
            return;
          }
          if (move.parentY - 1 !== array[i + 1].parentY) {
            if (!stateWordsPlayed.includes(word.join(""))) {
              if (word.length > 1) {
                words.push(word.join(""));
                multipliers.push(multiplier.join("-"));
              }
            }
            multiplier = [];
            word = [];
          }
        });
      }
      x++;
    };
    do buildWord_Y(moves.filter((move) => move.parentX === x));
    while (x <= Math.max(...moves.map((move) => move.parentX)));

    const buildWord_X = (arr) => {
      if (arr.length > 1) {
        let sorted = arr.sort((a, b) => {
          return a.parentX - b.parentX;
        });
        let word = [];
        let multiplier = [];
        sorted.forEach((move, i, array) => {
          word.push(move.tile);
          multiplier.push(move.multiplier);

          if (i == array.length - 1) {
            if (!stateWordsPlayed.includes(word.join(""))) {
              if (word.length > 1) {
                words.push(word.join(""));
                multipliers.push(multiplier.join("-"));
              }
              return;
            }
            return;
          }
          if (move.parentX + 1 !== array[i + 1].parentX) {
            if (!stateWordsPlayed.includes(word.join(""))) {
              if (word.length > 1) {
                words.push(word.join(""));
                multipliers.push(multiplier.join("-"));
              }
            }
            word = [];
            multiplier = [];
          }
        });
      }
      y--;
    };

    do buildWord_X(moves.filter((move) => move.parentY === y));
    while (y >= Math.min(...moves.map((move) => move.parentY)));

    // console.log(multipliers, "multipliers in hook")
    // console.log(words, "words in hook")
    // console.log(Array.from(new Set(words)), "new set")
    let newWords = Array.from(new Set(words))
    // console.log(`${words.join("-")}!${multipliers.join("#")}`, "to return in hook")
    return { 
      words: newWords.join("-"),
      multipliers: multipliers.join("#")
    };
  } catch (error) {
    console.log(error);
  }
};
