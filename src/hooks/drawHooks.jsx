import { tiles, startingUsedObj } from "../data/tile-count";
import letterValue from "../data/letter-value.json";

const randomIndex = (length) =>
  !length ? Math.floor(Math.random() * 27) : Math.floor(Math.random() * length);

export const useInitialDraw = async () => {
  // {tile: "blank", id: "PLAYER_BLNK1", value: 0}
  try {
    let tileCopy = {
      ...tiles,
    };

    let usedTiles = {
      ...startingUsedObj,
    };

    let players = [
      { isAI: false, tiles: [] },
      { isAI: true, tiles: [] },
    ];

    players.forEach((player) => {
      const drawTiles = (player, availableTiles) => {
        let { tiles, isAI } = player;
        let tile = availableTiles[randomIndex(availableTiles.length)];
        tileCopy[tile] -= 1;
        usedTiles[tile] += 1;
        let id = isAI
          ? `AI_${tile}${usedTiles[tile]}`
          : `PLAYER_${tile}${usedTiles[tile]}`;
        player.tiles.push({
          tile,
          id,
          value: letterValue[tile],
        });
        return tiles.length !== 7
          ? drawTiles(
              player,
              Object.keys(tileCopy).filter((key) => tileCopy[key] > 0)
            )
          : null;
      };
      drawTiles(
        player,
        Object.keys(tileCopy).filter((key) => tileCopy[key] > 0)
      );
    });

    return {
      updatedTiles: tileCopy,
      usedTiles,
      playerTiles: players[0].tiles,
      aiTiles: players[1].tiles,
    };
  } catch (error) {
    console.log(error);
  }
};

export const useReDraw = async (
  tilesToReplace,
  allTilesState,
  playerTilesState,
  isAI
) => {
  try {
    let modTiles = {
      ...allTilesState.tileBag,
    };
    let modUsedTiles = {
      ...allTilesState.tilesUsed,
    };

    await tilesToReplace.forEach((tileToExchange) => {
      modTiles[tileToExchange.tile] += 1;
      modUsedTiles[tileToExchange.tile] -= 1;
    });
    
    let result = await drawTile(
      0,
      Object.keys(modTiles).filter((key) => modTiles[key] > 0),
      tilesToReplace.length,
      [...playerTilesState],
      modTiles,
      modUsedTiles,
      isAI
    )  

    return {
      updatedBag: result.tileBag,
      updatedUsedTiles: result.usedTiles,
      playersTiles: result.newTiles,
    };
  } catch (error) {
    console.log(error);
  }
};

export const useDrawAfterPlay = async (
  tilesUsed,
  currentTilesState,
  allTilesState,
  isAI
) => {
  try {
    let modTiles = {
      ...allTilesState.tileBag,
    };
    let modUsedTiles = {
      ...allTilesState.tilesUsed,
    };

    let result = await drawTile(
      0,
      Object.keys(modTiles).filter((key) => modTiles[key] > 0),
      tilesUsed.length,
      [...currentTilesState],
      modTiles,
      modUsedTiles,
      isAI
    );

    return {
      newTiles: result.newTiles,
      updatedTiles: result.tileBag,
      usedTiles: result.usedTiles
    }
  } catch (error) {
    console.log(error);
  }
};


function drawTile(
  count,
  availableTiles,
  length,
  currentTiles,
  tilesObj,
  usedTileObj,
  isAI
) {
  if (count == length || availableTiles.length == 0) {
    return {
      newTiles: currentTiles,
      tileBag: tilesObj,
      usedTiles: usedTileObj,
    };
  }
  let tile = availableTiles[randomIndex(availableTiles.length)];
  tilesObj[tile] -= 1;
  usedTileObj[tile] += 1;

  let id = isAI
    ? `AI_${tile}${usedTileObj[tile]}`
    : `PLAYER_${tile}${usedTileObj[tile]}`;

  currentTiles.push({ tile, id, value: letterValue[tile] });

  return drawTile(
    count + 1,
    Object.keys(tilesObj).filter((key) => tilesObj[key] > 0),
    length,
    currentTiles,
    tilesObj,
    usedTileObj,
    isAI
  );
}
