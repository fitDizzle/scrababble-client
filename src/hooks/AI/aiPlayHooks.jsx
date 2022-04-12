import { all_words } from "../../data/words";

import {
  CenterBlock,
  DoubleLetterBlocks,
  DoubleWordBlocks,
  TrippleLetterBlocks,
  TrippleWordBlocks,
} from "../../data/GridData/BlockData";

import Letter_Values from "../../data/letter-value.json";

export const useCreatePossiblePlays = async (stateMoves, stateTiles) => {
  try {
    console.log("hit use create possible");

    let tileLetters = stateTiles.map((tile) => tile.tile);

    let currentX = Math.min(...stateMoves.map((move) => move.parentX));
    let currentY = Math.min(...stateMoves.map((move) => move.parentY));

    let maxX = Math.max(...stateMoves.map((move) => move.parentX));
    let maxY = Math.max(...stateMoves.map((move) => move.parentY));

    let movesOnXAxis = {};
    let movesOnYAxis = {};

    // Function is called to mimic a play and check if all corresponding new words made are valid
    const checkMoveValidity = (
      words,
      moves,
      regExArray,
      allMoves,
      allWords,
      axis
    ) => {
      let regExp = new RegExp(regExArray.join(""), "g");

      const mimicPlay = (word, move, moveIndex, axis) => {
        let play;
        if (axis === "x") {
          if (regExArray.length > 1) {
            let split = word.split("");
            split.splice(word.indexOf(regExArray.join("")), regExArray.length);
            let modified = split.map((letter, i, array) => {
              if (word.indexOf(letter) > move[0].parentY) {
                return {
                  tile: letter,
                  parentX: move[0].parentX,
                  parentY:
                    move[0].parentY -
                    (word.indexOf(move[0].tile) - word.indexOf(letter)),
                };
              } else {
                return {
                  tile: letter,
                  parentX: move[0].parentX,
                  parentY:
                    move[0].parentY +
                    (word.indexOf(move[0].tile) - word.indexOf(letter)),
                };
              }
            }); 
            play = modified;
          } else {
            play = word.split("").map((letter, i, array) => {
              if (i === moveIndex) {
                return null;
              }
              if (i < moveIndex) {
                return {
                  tile: letter,
                  parentX: move[0].parentX,
                  parentY: move[0].parentY + (moveIndex - i),
                };
              }
              if (i > moveIndex) {
                return {
                  tile: letter,
                  parentX: move[0].parentX,
                  parentY: move[0].parentY + (moveIndex - i),
                };
              }
            });

          }
          

          let newPlays = play.filter((play) => play !== null);
          let boolArray = newPlays.map((tempMove) => {
            let wordToCheck = allMoves.filter(
              (m) => m.parentY == tempMove.parentY
            );
            wordToCheck.push(tempMove);
            if (wordToCheck.length === 1) {
              return newPlays;
            }
            let strWord = wordToCheck
              .sort((a, b) => a.parentX - b.parentX)
              .map((m) => m.tile)
              .join("");
            let bool = allWords.includes(strWord);
            return bool;
          });
          if (boolArray.includes(false)) {
            return null;
          } else {
            let modTiles = [...stateTiles]
            console.log(stateTiles, "state tiles", newPlays)
            let playsWithTiles = newPlays.map(play => {
              let spliceIndex  = 0;
              let filtered = modTiles.filter((tile, i) => {
                if(tile.tile === play.tile){
                  spliceIndex = i
                }
                return tile.tile == play.tile
              })
              modTiles.splice(spliceIndex, 1)
              return Object.assign(play, filtered[0], {})
            })
            console.log(playsWithTiles, "plays with id")
            return playsWithTiles;
            // return newPlays;
          }
        } else {
          if (regExArray.length > 1) {
            let split = word.split("");
            split.splice(word.indexOf(regExArray.join("")), regExArray.length);
            let modified = split.map((letter, i, array) => {
              if (word.indexOf(letter) > move[0].parentY) {
                return {
                  tile: letter,
                  parentX:
                    move[0].parentX +
                    (word.indexOf(move[0].tile) - word.indexOf(letter)),
                  parentY: move[0].parentY,
                };
              } else {
                return {
                  tile: letter,
                  parentX:
                    move[0].parentX -
                    (word.indexOf(move[0].tile) - word.indexOf(letter)),
                  parentY: move[0].parentY,
                };
              }
            });
            play = modified;
          } else {
            play = word.split("").map((letter, i, array) => {
              if (i === moveIndex) {
                return null;
              }
              if (i < moveIndex) {
                return {
                  tile: letter,
                  parentX: move[0].parentX - (moveIndex - i),
                  parentY: move[0].parentY,
                };
              }
              if (i > moveIndex) {
                return {
                  tile: letter,
                  parentX: move[0].parentX + (i - moveIndex),
                  parentY: move[0].parentY,
                };
              }
            });
          }

          let newPlays = play.filter((play) => play !== null);
          let boolArray = newPlays.map((tempMove) => {
            let wordToCheck = allMoves.filter(
              (m) => m.parentX == tempMove.parentX
            );
            wordToCheck.push(tempMove);
            if (wordToCheck.length === 1) {
              return newPlays;
            }
            let strWord = wordToCheck
              .sort((a, b) => b.parentY - a.parentY)
              .map((m) => m.tile)
              .join("");
            let bool = allWords.includes(strWord);
            return bool;
          });
          if (boolArray.includes(false)) {
            return null;
          } else {
            let modTiles = [...stateTiles]
            console.log(stateTiles, "state tiles", newPlays)
            let playsWithTiles = newPlays.map(play => {
              let spliceIndex  = 0;
              let filtered = modTiles.filter((tile, i) => {
                if(tile.tile === play.tile){
                  spliceIndex = i
                }
                return tile.tile == play.tile
              })
              modTiles.splice(spliceIndex, 1)
              return Object.assign(play, filtered[0], {})
            })
            console.log(playsWithTiles, "plays with id")
            return playsWithTiles;
            // return newPlays;
          }
        }
      };
      let toReturn = words
        .map((word, i, array) => {
          let indexi = Array.from(word.matchAll(regExp), (v) => {
            return v.index;
          });
          let checkedArray = indexi.map((index) => {
            let result = mimicPlay(word, moves, index, axis);
            return result;
          });
          return {
            word: word,
            newMoves: checkedArray,
            orignalMoves: moves,
          };
        })
        .filter(
          (word) =>
            !word.newMoves.includes(null)
        );
      return toReturn;
    };

    const buildWords = async (currentTiles, moves, axis, allMoves) => {
      let sortedMoves;
      let regExArray = [];

      if (axis === "y") {
        sortedMoves = moves.sort((a, b) => a.parentX - b.parentX);
        sortedMoves.forEach((move, i, array) => {
          if (i !== array.length - 1) {
            if (move.parentX !== array[i + 1].parentX - 1) {
              regExArray.push(`${move.tile}`);
              regExArray.push(
                `[a-z]{${array[i + 1].parentX - move.parentX - 1}}`
              );
            } else {
              regExArray.push(`${move.tile}`);
            }
          } else {
            regExArray.push(`${move.tile}`);
          }
        });
      }
      if (axis === "x") {
        sortedMoves = moves.sort((a, b) => b.parentY - a.parentY);
        sortedMoves.forEach((move, i, array) => {
          if (i !== array.length - 1) {
            if (move.parentY !== array[i + 1].parentY + 1) {
              regExArray.push(`${move.tile}`);
              regExArray.push(
                `[a-z]{${move.parentY - array[i + 1].parentY - 1}}`
              );
            } else {
              regExArray.push(`${move.tile}`);
            }
          } else {
            regExArray.push(`${move.tile}`);
          }
        });
      }
      let playedLetters = moves.map((move) => move.tile).join("");

      let allLetters = [...currentTiles, playedLetters];

      const checkWord = (word, letters, regExArr) => {
        let localLetters = [...letters];
        let regEx = new RegExp(regExArr.join(""));

        if (!regEx.test(word)) {
          return false;
        }

        let splitWord = word.split("");
        splitWord.splice(word.indexOf(regExArr.join("")), regExArr.length);

        let boolArray = splitWord.map((wrdLetter) => {
          if (localLetters.includes(wrdLetter)) {
            localLetters.splice(localLetters.indexOf(wrdLetter), 1);
            return true;
          }
          return false;
        });
        return boolArray.includes(false) ? false : true;
      };

      let possibleWords;

      if (playedLetters.length === 1) {
        possibleWords = all_words
          .filter((word) => {
            return allLetters
              .map((letter) => word.startsWith(letter))
              .includes(true);
          })
          .filter((word) => checkWord(word, currentTiles, regExArray));
      } else {
        possibleWords = all_words
          .filter((word) => {
            return word.includes(playedLetters) && word !== playedLetters;
          })
          .filter((word) => {
            return checkWord(word, currentTiles, regExArray);
          });
      }

      let checked = checkMoveValidity(
        possibleWords,
        moves,
        regExArray,
        stateMoves,
        all_words,
        axis
      );

      if (axis === "x") {
        let newMoves = {
          ...movesOnXAxis,
          [currentX]: checked,
        };
        movesOnXAxis = newMoves;

        currentX++;
      } else {
        let newMoves = {
          ...movesOnYAxis,
          [currentY]: checked,
        };
        movesOnYAxis = newMoves;

        currentY++;
      }
    };

    do
      buildWords(
        tileLetters,
        stateMoves.filter((move) => move.parentX === currentX),
        "x",
        stateMoves
      );
    while (currentX <= maxX);

    do
      buildWords(
        tileLetters,
        stateMoves.filter((move) => move.parentY === currentY),
        "y",
        stateMoves
      );
    while (currentY <= maxY);

    const findPlay = (plays) => {
      try {
        console.log(plays, "in plays", Letter_Values);
        const BlockData = [
          ...CenterBlock,
          ...DoubleLetterBlocks,
          ...DoubleWordBlocks,
          ...DoubleWordBlocks,
          ...TrippleWordBlocks,
        ];
        let playsAndValues = {
          ...plays,
        };

        const findPlayValue = (key, playsArray, ax) => {
          const randomIndex = (length) => Math.floor(Math.random() * length);

          let mavinPlay = {
            total: 0,
          };
          let derpPlay = {
            total: 10000,
          };
          // 77777777777777777777  COME BACK HERE 7777777777777777777777777777777777777777777777777777777777777777
          // console.log(key, "key", playsArray, "value", ax, "axis");
          if (playsArray.length > 0) {
            // console.log("met", key);
            let modPlaysArray = playsArray.map((wordPlayObj) => {
              // console.log("met", key);
              let modPlayObj = {
                ...wordPlayObj,
                newMoves: wordPlayObj.newMoves.map((arr) => {
                  // console.log("met", key, arr);

                  return arr.map((play) => {
                    // console.log("met", key);

                    let multiplierFilter = BlockData.filter(
                      (data) => data.x == play.parentX && data.y == play.parentY
                    );

                    let modPlay = {
                      ...play,
                      value: Letter_Values[play.tile],
                      multiplier:
                        multiplierFilter.length > 0
                          ? multiplierFilter[0].value.join("")
                          : "none",
                    };
                    return modPlay;
                  });
                }),
              };
              // console.log(modPlayObj, key, "key", ax, "axis");
              let wordMultipliers = [];

              let newTotals = modPlayObj.newMoves.map((moveArr) => {
                let values = moveArr
                  .map((move) => {
                    let { value, multiplier } = move;
                    if (multiplier === "2letter") {
                      return value * 2;
                    }
                    if (multiplier === "3letter") {
                      return value * 3;
                    }
                    if (multiplier === "none") {
                      return value;
                    }
                    wordMultipliers.push(multiplier);
                    return value;
                  })
                  .reduce((a, b) => a + b, 0);
                return values;
              });
              // console.log(newTotals, "new totals");
              let orignalTotals = modPlayObj.orignalMoves.map((move) => {
                let { value, multiplier } = move;
                if (multiplier === "2letter") {
                  return value * 2;
                }
                if (multiplier === "3letter") {
                  return value * 3;
                }
                if (multiplier === "none") {
                  return value;
                }
                wordMultipliers.push(multiplier);
                return value;
              });
              // console.log(orignalTotals, "orginal");
              let newMoveTotal;
              if (newTotals.length > 1) {
                let tempTotal = [];
                let index = 0;
                while (index < newTotals.length) {
                  if (wordMultipliers.includes("2word")) {
                    let dblVal =
                      (orignalTotals.reduce((a, b) => a + b, 0) +
                        newTotals[index]) *
                      2;
                    tempTotal.push(dblVal);
                  }
                  if (wordMultipliers.includes("2word")) {
                    let tripVal =
                      (orignalTotals.reduce((a, b) => a + b, 0) +
                        newTotals[index]) *
                      2;
                    tempTotal.push(tripVal);
                  }

                  tempTotal.push(
                    orignalTotals.reduce((a, b) => a + b, 0) + newTotals[index]
                  );
                  // console.log(modPlayObj, tempTotal, "in while");
                  if (tempTotal[index] > mavinPlay.total) {
                   
                    mavinPlay = {
                      word: modPlayObj.word,
                      newMoves: [...modPlayObj.newMoves[index]],
                      orignalMoves: [...modPlayObj.orignalMoves],
                      total: tempTotal[index],
                    };
                  }
                  if (tempTotal[index] < derpPlay.total) {
                    derpPlay = {
                      word: modPlayObj.word,
                      newMoves: [...modPlayObj.newMoves[index]],
                      orignalMoves: [...modPlayObj.orignalMoves],
                      total: tempTotal[index],
                    };
                  }
                  index++;
                }

                return {
                  ...modPlayObj,
                  total: tempTotal,
                };
              }

              newMoveTotal =
                orignalTotals.reduce((a, b) => a + b, 0) +
                newTotals.reduce((a, b) => a + b, 0);
              // console.log(newMoveTotal, "new total");
              if (wordMultipliers.includes("2word")) {
                newMoveTotal *= 2;
              }
              if (wordMultipliers.includes("2word")) {
                newMoveTotal *= 3;
              }
              if (newMoveTotal > mavinPlay.total) {
                mavinPlay = {
                  ...modPlayObj,
                  total: newMoveTotal,
                };
              }
              if (newMoveTotal < derpPlay.total) {
                derpPlay = {
                  ...modPlayObj,
                  total: newMoveTotal,
                };
              }
              return {
                ...modPlayObj,
                total: newMoveTotal,
              };
            });
            let result = {
              mavin: mavinPlay,
              derp: derpPlay,
            };
            playsAndValues[ax] = {
              ...playsAndValues[ax],
              [key]: result,
            };
          } else {
            let result = {
              mavin: {},
              derp: {},
            };
            playsAndValues[ax] = {
              ...playsAndValues[ax],
              [key]: result,
            };
          }

          // console.log(modPlaysArray, "mod");
          // console.log(mavinPlay, "best play");
          // console.log(derpPlay, "derp");
        };
        // findPlayValue("7", playsAndValues.y["7"]);

        Object.keys(playsAndValues.y).forEach((key) => {
          findPlayValue(key, playsAndValues.y[key], "y");
        });
        Object.keys(playsAndValues.x).forEach((key) => {
          findPlayValue(key, playsAndValues.x[key], "x");
        });

        console.log(playsAndValues, "return");
        let returnPlays = {
          mavin: {
            total: 0,
          },
          derp: {
            total: 1000,
          },
        };

        Object.values(playsAndValues).forEach((axis) => {
          Object.values(axis).forEach((moveObj) => {
            if (moveObj.mavin.total > returnPlays.mavin.total) {
              returnPlays = {
                ...returnPlays,
                mavin: moveObj.mavin,
              };
            }
            if (moveObj.derp.total < returnPlays.derp.total) {
              returnPlays = {
                ...returnPlays,
                derp: moveObj.derp,
              };
            }
          });
        });

        return returnPlays;
      } catch (error) {
        console.log(error);
      }
    };

    return findPlay({
      x: movesOnXAxis,
      y: movesOnYAxis,
    });
  } catch (error) {
    console.log(error);
  }
};

export const useMakePlay = (finalPlays, aiState) => {
  try {
    console.log(finalPlays, "final plays");
  } catch (error) {
    console.log(error);
  }
};
