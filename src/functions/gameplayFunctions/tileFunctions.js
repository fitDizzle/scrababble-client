// import { tiles } from "../../data/tile-count";
// import letterValue from "../../data/letter-value.json";

// import {
//   UPDATE_BAG,
//   UPDATE_PLAYER_TILES,
// } from "../../Redux/actions/types/gameplayTypes";

// export default {
//   initialDraw: () => {
//     let players = [
//       { isAI: false, tiles: [] },
//       { isAI: true, tiles: [] },
//     ];
//     let tileCopy = {
//       ...tiles,
//     };

//     let usedTiles = {
//       a: 0,
//       b: 0,
//       c: 0,
//       d: 0,
//       e: 0,
//       f: 0,
//       g: 0,
//       h: 0,
//       i: 0,
//       j: 0,
//       k: 0,
//       l: 0,
//       m: 0,
//       n: 0,
//       o: 0,
//       p: 0,
//       q: 0,
//       r: 0,
//       s: 0,
//       t: 0,
//       u: 0,
//       v: 0,
//       w: 0,
//       x: 0,
//       y: 0,
//       z: 0,
//       blank: 0,
//     };
//     console.log(letterValue)


//     const randomIndex = () => Math.floor(Math.random() * 26);
//     let playersToReturn = players.map((player) => {
//       let count = 1;
//       const draw = (player, tiles) => {
//         let tile = Object.keys(tiles)[randomIndex()];
//         if (tiles[tile] > 0) {
//           tileCopy[tile] -= 1;
//           usedTiles[tile] += 1;
//           player.tiles.push({
//             tile,
//             id: `${tile}${usedTiles[tile]}`,
//             value: letterValue[tile],
//           });
//           count++;
//         } else {
//           draw(player, tiles);
//         }
//       };
//       do draw(player, tileCopy);
//       while (count < 8);
//       return player;
//     });
//     return {
//       updatedTiles: tileCopy,
//       usedTiles,
//       playerTiles: playersToReturn[0].tiles,
//       aiTiles: playersToReturn[1].tiles,
//     };
//   },
//   updateTilesAfterPlay: async (
//     tilesUsed,
//     dispatch,
//     isAi,
//     currentTilesState,
//     allTilesState
//   ) => {
//     try {
//       console.log("________UPDATE TILES FUNCTION START____________________");
//       console.log(tilesUsed);
//       // console.log(dispatch);
//       console.log(currentTilesState);
//       const randomIndex = () => Math.floor(Math.random() * 26);

//       let newTiles = [...currentTilesState];
//       let modTiles = {
//         ...allTilesState.tileBag,
//       };
//       let modUsedTiles = {
//         ...allTilesState.tilesUsed,
//       };
//       let draws = 0;

//       const drawTile = (allTiles, usedTile) => {
//         console.log(allTiles, usedTile);
//         let tile = Object.keys(tiles)[randomIndex()];

//         if (tiles[tile] > 0) {
//           // player.tiles.splice(player.tiles.indexOf(toRemove), 1, tile);
//           newTiles.splice(newTiles.indexOf(usedTile.letter), 1, tile);
//           modTiles[tile] -= 1;
//           modUsedTiles[tile] += 1;
//         } else {
//           drawTile(modTiles, tilesUsed[draws]);
//         }

//         draws++;
//       };

//       do drawTile(modTiles, tilesUsed[draws]);
//       while (draws < tilesUsed.length);

//       console.log(currentTilesState, newTiles);
//       console.log(allTilesState.tileBag, modTiles);
//       await dispatch({
//         type: UPDATE_BAG,
//         payload: {
//           updatedTiles: modTiles,
//           usedTiles: modUsedTiles,
//         },
//       });
//       await dispatch({
//         type: UPDATE_PLAYER_TILES,
//         payload: newTiles,
//       });

//       console.log("_______UPDATE TILES FUNCTION END_______________________");
//     } catch (error) {
//       console.log(error);
//     }
//   },
//   reDraw: async (tilesToReplace, allTilesState, playerTilesState) => {
//     try {
//       console.log(tilesToReplace, allTilesState, playerTilesState);

//       const randomIndex = () => Math.floor(Math.random() * 26);

//       let newTiles = [...playerTilesState];

//       let modTiles = {
//         ...allTilesState.tileBag,
//       };
//       let modUsedTiles = {
//         ...allTilesState.tilesUsed,
//       };

//       let draws = 0;

//       const drawTile = (allTiles, usedTile) => {
//         console.log(allTiles, usedTile);
//         let tile = Object.keys(tiles)[randomIndex()];

//         if (tiles[tile] > 0) {
//           newTiles.splice(newTiles.indexOf(usedTile.letter), 1, tile);
//           modTiles[tile] -= 1;
//           modTiles[usedTile] += 1;
//           modUsedTiles[tile] += 1;
//           modUsedTiles[usedTile] -= 1;
//         } else {
//           drawTile(modTiles, tilesToReplace[draws]);
//         }

//         draws++;
//       };

//       do drawTile(modTiles, tilesToReplace[draws]);
//       while (draws < tilesToReplace.length);

//       return {
//         updatedBag: modTiles,
//         updatedUsedTiles: modUsedTiles,
//         playersTiles: newTiles,
//       };
//     } catch (error) {
//       console.log(error);
//     }
//   },
// };
