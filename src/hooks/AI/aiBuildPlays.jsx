import { all_words } from "../../data/words";

import {
  CenterBlock,
  DoubleLetterBlocks,
  DoubleWordBlocks,
  TrippleLetterBlocks,
  TrippleWordBlocks,
} from "../../data/GridData/BlockData";

import Letter_Values from "../../data/letter-value.json";

export const useAiBuildPlays = (stateMoves, stateTiles, level) => {
  try {
    console.log("______________AI Play Refactored Started____________");
    let tileLetters = stateTiles.map((tile) => tile.tile);

    let currentX =
      stateMoves.length > 0
        ? Math.min(...stateMoves.map((move) => move.parentX))
        : 8;
    let currentY =
      stateMoves.length > 0
        ? Math.min(...stateMoves.map((move) => move.parentY))
        : 8;

    let maxX = Math.max(...stateMoves.map((move) => move.parentX));
    let maxY = Math.max(...stateMoves.map((move) => move.parentY));

    // let derpPlay = {
    //   total: 1000,
    //   word: null,
    // };
    // let mavinPlay = {
    //   total: 0,
    //   word: null,
    // };

    let allPlayPossibilities = {
      X: {},
      Y: {},
    };

    let blankFound = tileLetters.includes("blank") ? true : false;

    async function buildWords(tiles, movesOnAxis, axis, allMoves) {
      let regExArray = [];
      let sortedMoves;

      if (axis === "Y") {
        sortedMoves = movesOnAxis.sort((a, b) => a.parentX - b.parentX);
        sortedMoves.forEach((move, i, array) => {
          if (i !== array.length - 1) {
            if (move.parentX !== array[i + 1].parentX - 1) {
              regExArray.push(`${move.tile}`);
              let count = 1;
              while (count <= array[i + 1].parentX - move.parentX - 1) {
                regExArray.push("[a-z]");
                count++;
              }
            } else {
              regExArray.push(`${move.tile}`);
            }
          } else {
            regExArray.push(`${move.tile}`);
          }
        });
      }
      if (axis === "X") {
        sortedMoves = movesOnAxis.sort((a, b) => b.parentY - a.parentY);
        sortedMoves.forEach((move, i, array) => {
          if (i !== array.length - 1) {
            if (move.parentY !== array[i + 1].parentY + 1) {
              regExArray.push(`${move.tile}`);
              let count = 1;
              while (count <= array[i + 1].parentY - move.parentY - 1) {
                regExArray.push("[a-z]");
                count++;
              }
            } else {
              regExArray.push(`${move.tile}`);
            }
          } else {
            regExArray.push(`${move.tile}`);
          }
        });
      }

      let playedLetters = movesOnAxis.map((move) => move.tile).join("");

      let allLetters = [...tiles, playedLetters];
      if (blankFound) {
        let initialWords = all_words
          .map((word) => checkWord(word, tiles, regExArray, playedLetters))
          .filter((obj) => obj)
          .map((wordObj) => {
            return {
              word: wordObj.word,
              moves: checkMoveValidity(
                wordObj.word,
                movesOnAxis,
                wordObj.regExArray,
                stateMoves,
                all_words,
                axis,
                wordObj.indexToStart
              ),
            };
          });

        axis === "X"
          ? (allPlayPossibilities = {
              ...allPlayPossibilities,
              [axis]: {
                ...allPlayPossibilities[axis],
                [currentX]: initialWords.filter(
                  (move) => move.moves[0] !== null
                ),
              },
            })
          : (allPlayPossibilities = {
              ...allPlayPossibilities,
              [axis]: {
                ...allPlayPossibilities[axis],
                [currentY]: initialWords.filter(
                  (move) => move.moves[0] !== null
                ),
              },
            });
      } else {
        let possibleWords = all_words
          .filter((word) => {
            return allLetters
              .map((letter) => word.startsWith(letter[0]))
              .includes(true);
          })
          .map((word) => checkWord(word, tiles, regExArray, playedLetters))
          .filter((obj) => obj)
          .map((wordObj) => {
            return {
              word: wordObj.word,
              moves: checkMoveValidity(
                wordObj.word,
                movesOnAxis,
                wordObj.regExArray,
                stateMoves,
                all_words,
                axis,
                wordObj.indexToStart
              ),
            };
          });

        if (axis === "X") {
          allPlayPossibilities = {
            ...allPlayPossibilities,
            [axis]: {
              ...allPlayPossibilities[axis],
              [currentX]: possibleWords.filter(
                (move) => move.moves[0] !== null
              ),
            },
          };
        } else {
          allPlayPossibilities = {
            ...allPlayPossibilities,
            [axis]: {
              ...allPlayPossibilities[axis],
              [currentY]: possibleWords.filter(
                (move) => move.moves[0] !== null
              ),
            },
          };
        }
      }

      axis === "X" ? currentX++ : currentY++;
    }

    do
      buildWords(
        tileLetters,
        stateMoves.filter((move) => move.parentX === currentX),
        "X",
        stateMoves
      );
    while (currentX <= maxX);

    do
      buildWords(
        tileLetters,
        stateMoves.filter((move) => move.parentY === currentY),
        "Y",
        stateMoves
      );
    while (currentY <= maxY);

    function checkWord(wordToCheck, tiles, regExArray, lettersOnBoard) {
      let regEx = new RegExp(regExArray.join(""));
      let localLetters = [...tiles];
      let localBoardLetters = lettersOnBoard ? [...lettersOnBoard] : [];
      let indexToPass = 0;
      let regExArrayToPass = regExArray;

      if (wordToCheck === regExArray.join("")) {
        return false;
      }
      if (!regEx.test(wordToCheck)) {
        let x = wordToCheck
          .split("")
          .map((letter, i, array) => {
            let index = regExArray.indexOf(letter);
            let start = i > index ? 0 : index - i;
            return index > -1
              ? {
                  regEx: regExArray.slice(start, index + (array.length - i)),
                  index: i,
                  letter,
                }
              : null;
          })
          .filter((regArray) => regArray);

        let checked = x.map((obj) => {
          let tempRegEx = new RegExp(obj.regEx.join(""));
          if (tempRegEx.test(wordToCheck)) {
            indexToPass = lettersOnBoard.indexOf(obj.letter);
            regExArrayToPass = obj.regEx;
            return {
              bool: true,
              index: obj.index,
            };
          }
          return false;
        });

        if (checked.filter((obj) => obj).length === 0) {
          return false;
        }
      }

      let splitWord = wordToCheck.split("");

      let boolArray = splitWord.map((wordLetter) => {
        if (localBoardLetters.includes(wordLetter)) {
          localBoardLetters.splice(localBoardLetters.indexOf(wordLetter), 1);
          return true;
        }
        if (localLetters.includes(wordLetter)) {
          localLetters.splice(localLetters.indexOf(wordLetter), 1);
          return true;
        }
        if (localLetters.includes("blank")) {
          localLetters.splice(localLetters.indexOf("blank"), 1);
          return true;
        }

        return false;
      });

      return boolArray.includes(false)
        ? false
        : {
            indexToStart: indexToPass,
            regExArray: regExArrayToPass,
            word: wordToCheck,
          };
    }

    function checkMoveValidity(
      word,
      movesOnBoard,
      regExArray,
      allMoves,
      allWords,
      axis,
      indexToStart
    ) {
      let regExp = new RegExp(regExArray.join(""), "g");

      return Array.from(word.matchAll(regExp), (match) => {
        return match.index;
      }).map((index) => {
        if (axis === "X") {
          return mimicPlayX(
            word,
            movesOnBoard.sort((a, b) => b.parentY - a.parentY),
            indexToStart
          );
        } else {
          return mimicPlayY(
            word,
            movesOnBoard.sort((a, b) => a.parentX - b.parentX),
            indexToStart
          );
        }
      });

      function mimicPlayX(word, moves, indexToStart) {
        let play;

        if (moves.length > 0) {
          let movesCopy = [...moves];
          let newPlays = [];
          let up = word.indexOf(movesCopy[indexToStart].tile) - 1;
          let down = word.indexOf(movesCopy[indexToStart].tile) + 1;
          let downParentY = moves[indexToStart].parentY - 1;
          let upParentY = moves[indexToStart].parentY + 1;
          const buildPlay = (u, d, uParentY, dParentY) => {
            if (u < 0 && d === word.length) {
              return;
            }
            if (u >= 0) {
              let foundUp = movesCopy.filter(
                (move) => move.parentY === uParentY
              );
              if (foundUp.length === 0) {
                newPlays.unshift({
                  tile: word[u],
                  parentX: moves[indexToStart].parentX,
                  parentY: uParentY,
                });
              }

              u -= 1;
              uParentY += 1;
            }
            if (d < word.length) {
              let foundDown = movesCopy.filter(
                (move) => move.parentY === dParentY
              );
              if (foundDown.length === 0) {
                newPlays.push({
                  tile: word[d],
                  parentX: moves[indexToStart].parentX,
                  parentY: dParentY,
                });
              }

              d += 1;
              dParentY -= 1;
            }

            buildPlay(u, d, uParentY, dParentY);
          };
          buildPlay(up, down, upParentY, downParentY);

          play = newPlays;
        } else {
          let mappedWord = word.split("").map((letter, i) => {
            return {
              tile: letter,
              parentX: 8,
              parentY: 9 - i,
            };
          });
          play = mappedWord;
        }
        let otherWordsMade = [];

        let result = Make_Word_UpDown(
          Math.max(...play.map((p) => p.parentY)) + 1,
          Math.min(...play.map((p) => p.parentY)) - 1,
          [...play],
          allMoves.filter((move) => move.parentX === currentX),
          []
        );
        if (result.wordToCheck !== word) {
          return null;
        }
        if (!all_words.includes(result.wordToCheck)) {
          return null;
        }

        let boolArray = play.map((tempMove) => {
          if (tempMove.parentY < 1 || tempMove.parentY > 15) {
            return false;
          }

          let res = Make_Word_LeftRight(
            tempMove.parentX + 1,
            tempMove.parentX - 1,
            [tempMove],
            allMoves.filter((m) => m.parentY == tempMove.parentY)
          );

          if (res.wordToCheck.length === 1) {
            return true;
          }
          if (
            res.wordToCheck.length > 1 &&
            allWords.includes(res.wordToCheck)
          ) {
            otherWordsMade.push(res);
          }
          return allWords.includes(res.wordToCheck);
        });
        if (boolArray.includes(false)) {
          return null;
        }

        let playsWithActualTiles = [];
        let modStateTiles = [...stateTiles];

        play.forEach((play) => {
          let filtered = modStateTiles.filter((tile, i) => {
            return tile.tile == play.tile;
          });
          if (filtered.length === 0 && blankFound) {
            let blanks = modStateTiles.filter((tile) => tile.tile === "blank");
            if (blanks.length > 0) {
              playsWithActualTiles.push(
                Object.assign(play, { id: blanks[0].id, value: 0 }, {})
              );
              modStateTiles.splice(
                modStateTiles.map((tile) => tile.id).indexOf(blanks[0].id),
                1
              );
              return;
            }
            return;
          }
          if (filtered.length == 0 && !blankFound) {
            return null;
          }
          modStateTiles.splice(
            modStateTiles.map((tile) => tile.id).indexOf(filtered[0].id),
            1
          );
          playsWithActualTiles.push(Object.assign(play, filtered[0], {}));
        });

        let valueAndMultiplierResult;

        if (otherWordsMade.length > 0) {
          let allWordsToCheck = [
            playsWithActualTiles,
            ...otherWordsMade.map((word) => word.moves),
          ];
          let tempValResult = allWordsToCheck.map((arr, i) => {
            return i === 0
              ? setPlayValueAndMultipliers(
                  arr,
                  result.originalMoves,
                  true,
                  true
                )
              : setPlayValueAndMultipliers(
                  arr.filter((p) => p.tileState),
                  [],
                  false
                );
          });
          let combinedTotal = tempValResult.reduce((a, b) => a + b.total, 0);
          let toSend = tempValResult.filter((res) => res.isMainPlay);
          valueAndMultiplierResult = {
            ...toSend[0],
            total: combinedTotal,
          };
        } else {
          valueAndMultiplierResult = setPlayValueAndMultipliers(
            playsWithActualTiles,
            result.originalMoves,
            true
          );
        }

        return play.length == playsWithActualTiles.length
          ? {
              newMoves: playsWithActualTiles,
              originalMoves: result.originalMoves,
              total: valueAndMultiplierResult.total,
              multipliers: valueAndMultiplierResult.multipliers,
              additionalWords:
                otherWordsMade.length > 0
                  ? otherWordsMade.map((word) => word.wordToCheck)
                  : null,
            }
          : null;
      }

      function mimicPlayY(word, moves, indexToStart) {
        let play;

        if (moves.length > 0) {
          let movesCopy = [...moves];
          let newPlays = [];
          let left = word.indexOf(movesCopy[indexToStart].tile) - 1;
          let right = word.indexOf(movesCopy[indexToStart].tile) + 1;
          let rightParentX = moves[indexToStart].parentX + 1;
          let leftParentX = moves[indexToStart].parentX - 1;
          const buildPlay = (r, l, rParentX, lParentX) => {
            if (l < 0 && r === word.length) {
              return;
            }
            if (l >= 0) {
              let foundLeft = movesCopy.filter(
                (move) => move.parentX === lParentX
              );
              if (foundLeft.length === 0) {
                newPlays.unshift({
                  tile: word[l],
                  parentX: lParentX,
                  parentY: moves[indexToStart].parentY,
                });
              }

              l -= 1;
              lParentX -= 1;
            }
            if (r < word.length) {
              let foundRight = movesCopy.filter(
                (move) => move.parentX === rParentX
              );
              if (foundRight.length === 0) {
                newPlays.push({
                  tile: word[r],
                  parentX: rParentX,
                  parentY: moves[indexToStart].parentY,
                });
              }

              r += 1;
              rParentX += 1;
            }

            buildPlay(r, l, rParentX, lParentX);
          };
          buildPlay(right, left, rightParentX, leftParentX);

          play = newPlays;
        } else {
          let mappedWord = word.split("").map((letter, i) => {
            return {
              tile: letter,
              parentY: 8,
              parentX: 7 + i,
            };
          });
          play = mappedWord;
        }

        let otherWordsMade = [];

        let result = Make_Word_LeftRight(
          Math.max(...play.map((p) => p.parentX)) + 1,
          Math.min(...play.map((p) => p.parentX)) - 1,
          [...play],
          allMoves.filter((move) => move.parentY === currentY),
          []
        );

        if (result.wordToCheck !== word) {
          return null;
        }

        if (!all_words.includes(result.wordToCheck)) {
          return null;
        }

        let boolArray = play.map((tempMove) => {
          if (tempMove.parentX < 1 || tempMove.parentX > 15) {
            return false;
          }

          let res = Make_Word_UpDown(
            tempMove.parentY + 1,
            tempMove.parentY - 1,
            [tempMove],
            allMoves.filter((m) => m.parentX == tempMove.parentX)
          );

          if (res.wordToCheck.length === 1) {
            return true;
          }
          if (
            res.wordToCheck.length > 1 &&
            allWords.includes(res.wordToCheck)
          ) {
            otherWordsMade.push(res);
          }
          return allWords.includes(res.wordToCheck);
        });
        if (boolArray.includes(false)) {
          return null;
        }

        let playsWithActualTiles = [];
        let modStateTiles = [...stateTiles];

        play.forEach((play) => {
          let filtered = modStateTiles.filter((tile, i) => {
            return tile.tile == play.tile;
          });
          if (filtered.length === 0 && blankFound) {
            let blanks = modStateTiles.filter((tile) => tile.tile === "blank");
            if (blanks.length > 0) {
              playsWithActualTiles.push(
                Object.assign(play, { id: blanks[0].id, value: 0 }, {})
              );
              modStateTiles.splice(
                modStateTiles.map((tile) => tile.id).indexOf(blanks[0].id),
                1
              );
              return;
            }
            return;
          }
          if (filtered.length == 0 && !blankFound) {
            return null;
          }
          modStateTiles.splice(
            modStateTiles.map((tile) => tile.id).indexOf(filtered[0].id),
            1
          );
          playsWithActualTiles.push(Object.assign(play, filtered[0], {}));
        });

        let valueAndMultiplierResult;

        if (otherWordsMade.length > 0) {
          let allWordsToCheck = [
            playsWithActualTiles,
            ...otherWordsMade.map((word) => word.moves),
          ];
          let tempValResult = allWordsToCheck.map((arr, i) => {
            return i === 0
              ? setPlayValueAndMultipliers(
                  arr,
                  result.originalMoves,
                  true,
                  true
                )
              : setPlayValueAndMultipliers(
                  arr.filter((p) => p.tileState),
                  [],
                  false
                );
          });
          let combinedTotal = tempValResult.reduce((a, b) => a + b.total, 0);
          let toSend = tempValResult.filter((res) => res.isMainPlay);
          valueAndMultiplierResult = {
            ...toSend[0],
            total: combinedTotal,
          };
        } else {
          valueAndMultiplierResult = setPlayValueAndMultipliers(
            playsWithActualTiles,
            result.originalMoves,
            true
          );
        }
        return play.length == playsWithActualTiles.length
          ? {
              newMoves: playsWithActualTiles,
              originalMoves: result.originalMoves,
              total: valueAndMultiplierResult.total,
              multipliers: valueAndMultiplierResult.multipliers,
              additionalWords:
                otherWordsMade.length > 0
                  ? otherWordsMade.map((word) => word.wordToCheck)
                  : null,
            }
          : null;
      }

      function setPlayValueAndMultipliers(newPlays, boardPlays, isMainPlay) {
        const BlockData = [
          ...CenterBlock,
          ...DoubleLetterBlocks,
          ...DoubleWordBlocks,
          ...TrippleLetterBlocks,
          ...TrippleWordBlocks,
        ];

        let combinedPlays = [...newPlays, ...boardPlays];
        let allMultipliers = [];

        let playsWithMultipliers = combinedPlays.map((play) => {
          let filteredBlockData = BlockData.filter(
            (data) => data.x === play.parentX && data.y === play.parentY
          );
          if (filteredBlockData.length > 0) {
            if (filteredBlockData[0].value.includes("nada")) {
              allMultipliers.push("none");
              return {
                ...play,
                multiplier: "none",
              };
            } else {
              allMultipliers.push(filteredBlockData[0].value);
              if (filteredBlockData[0].value.includes("letter")) {
                return {
                  ...play,
                  value: play.value * filteredBlockData[0].value[0],
                  multiplier: filteredBlockData[0].value.join(""),
                };
              }
            }
          } else {
            allMultipliers.push("none");
          }

          return {
            ...play,
            multiplier: "none",
          };
        });
        let total = playsWithMultipliers.reduce((a, b) => a + b.value, 0);
        let joinedMultipliers = allMultipliers.map((multiplier) => {
          if (multiplier.includes("word")) {
            total *= multiplier[0];
          }
          return Array.isArray(multiplier) ? multiplier.join("") : multiplier;
        });
        return {
          total,
          multipliers: joinedMultipliers,
          isMainPlay,
        };
      }
    }

    console.log(allPlayPossibilities, "#############################");
    return findAndSendPlay(level, allPlayPossibilities);
  } catch (error) {
    console.log("There was an error with the AI Build Plays Hook");
    console.log(error);
  }
};

const Make_Word_LeftRight = (
  right,
  left,
  wordToCheck,
  movesOnValue,
  originalMoves
) => {
  try {
    let filteredRight = movesOnValue.filter((move) => move.parentX == right);
    let filteredLeft = movesOnValue.filter((move) => move.parentX == left);
    let movesBetween = [];

    if (filteredRight.length === 0 && filteredLeft.length === 0) {
      if (originalMoves && wordToCheck.length > 0) {
        movesBetween = movesOnValue.filter((move) => {
          let filtered = wordToCheck.filter((m) => m.parentX == move.parentX);
          return (
            filtered.length === 0 &&
            move.parentX > wordToCheck[0].parentX &&
            move.parentX < wordToCheck[wordToCheck.length - 1].parentX
          );
        });
      }
      return originalMoves
        ? {
            wordToCheck:
              movesBetween.length > 0
                ? [...wordToCheck, ...movesBetween]
                    .sort((a, b) => a.parentX - b.parentX)
                    .map((p) => p.tile)
                    .join("")
                : wordToCheck.map((p) => p.tile).join(""),
            originalMoves:
              movesBetween.length > 0
                ? [...originalMoves, ...movesBetween]
                : originalMoves,
            moves: wordToCheck,
          }
        : {
            wordToCheck: wordToCheck.map((p) => p.tile).join(""),
            moves: wordToCheck,
          };
    }

    if (filteredRight.length > 0) {
      wordToCheck.push(filteredRight[0]);
      if (originalMoves) {
        originalMoves.push(filteredRight[0]);
      }
      right++;
    }

    if (filteredLeft.length > 0) {
      wordToCheck.unshift(filteredLeft[0]);
      if (originalMoves) {
        originalMoves.unshift(filteredLeft[0]);
      }
      left--;
    }

    return originalMoves
      ? Make_Word_LeftRight(
          right,
          left,
          wordToCheck,
          movesOnValue,
          originalMoves
        )
      : Make_Word_LeftRight(right, left, wordToCheck, movesOnValue);
  } catch (error) {
    console.log(error);
  }
};

const Make_Word_UpDown = (
  up,
  down,
  wordToCheck,
  movesOnValue,
  originalMoves
) => {
  try {
    let filteredUp = movesOnValue.filter((move) => move.parentY == up);
    let filteredDown = movesOnValue.filter((move) => move.parentY == down);
    let movesBetween = [];

    if (filteredUp.length === 0 && filteredDown.length === 0) {
      if (originalMoves && wordToCheck.length > 0) {
        movesBetween = movesOnValue.filter((move) => {
          let filtered = wordToCheck.filter((m) => m.parentY == move.parentY);

          return (
            filtered.length === 0 &&
            move.parentY < wordToCheck[0].parentY &&
            move.parentY > wordToCheck[wordToCheck.length - 1].parentY
          );
        });
      }
      return originalMoves
        ? {
            wordToCheck:
              movesBetween.length > 0
                ? [...wordToCheck, ...movesBetween]
                    .sort((a, b) => b.parentY - a.parentY)
                    .map((p) => p.tile)
                    .join("")
                : wordToCheck.map((p) => p.tile).join(""),
            originalMoves:
              movesBetween.length > 0
                ? [...originalMoves, ...movesBetween]
                : originalMoves,
            moves: wordToCheck,
          }
        : {
            wordToCheck: wordToCheck.map((p) => p.tile).join(""),
            moves: wordToCheck,
          };
    }
    if (filteredDown.length > 0) {
      wordToCheck.push(filteredDown[0]);
      if (originalMoves) {
        originalMoves.push(filteredDown[0]);
      }
      down--;
    }
    if (filteredUp.length > 0) {
      wordToCheck.unshift(filteredUp[0]);
      if (originalMoves) {
        originalMoves.unshift(filteredUp[0]);
      }
      up++;
    }

    return originalMoves
      ? Make_Word_UpDown(up, down, wordToCheck, movesOnValue, originalMoves)
      : Make_Word_UpDown(up, down, wordToCheck, movesOnValue);
  } catch (error) {
    console.log(error);
  }
};

const findAndSendPlay = (level, allPlays) => {
  try {
    let flatPlaysArr = Object.values(allPlays)
      .map((obj) => Object.values(obj))
      .flat(Infinity);

    if (flatPlaysArr.length == 0) return null;

    let playsArr = flatPlaysArr.sort(
      (a, b) => a.moves[0].total - b.moves[0].total
    );

    let play =
      level == "MAVIN"
        ? playsArr[playsArr.length - 1]
        : level == "DERP"
        ? playsArr[0]
        : playsArr[parseInt(playsArr.length / 2)];

    const { word } = play;
    const {
      additionalWords,
      multipliers,
      newMoves,
      originalMoves,
      total,
    } = play.moves[0];

    return {
      word,
      additionalWords,
      multipliers,
      newMoves,
      originalMoves,
      total,
    };
  } catch (error) {
    console.log(error);
  }
};
