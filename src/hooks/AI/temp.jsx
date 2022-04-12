function Make_Word(
  left,
  right,
  wordToCheck,
  originalMovesToPass,
  movesOnSpecificValue,
  axis
) {
  try {
    // left = up
    // right = down 
    let filteredRight = movesOnSpecificValue.filter(
      (move) => move.parentX == right
    );
    let filteredLeft = movesOnSpecificValue.filter(
      (move) => move.parentX == left
    );
    if (filteredRight.length === 0 && filteredLeft.length === 0) {
        console.log(wordToCheck, "within func")
      return {
        orignalMoves: originalMovesToPass,
        wordToCheck: wordToCheck.map((p) => p.tile).join(""),
      };
    }
    if (filteredRight.length > 0) {
      wordToCheck.push(filteredRight[0]);
      originalMovesToPass.push(filteredRight[0]);
      if (axis === "X") {
        right++;
      } else {
        right--;
      }
    }
    if (filteredLeft.length > 0) {
      wordToCheck.unshift(filteredLeft[0]);
      originalMovesToPass.push(filteredLeft[0]);
      if (axis === "X") {
        left--;
      } else {
        left++;
      }
    }

    Make_Word(
      right,
      left,
      wordToCheck,
      originalMovesToPass,
      movesOnSpecificValue,
      axis
    );
  } catch (error) {
    console.log(error);
  }
}
