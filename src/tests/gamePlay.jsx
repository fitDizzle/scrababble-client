import { useEffect } from 'react';
import pieceFunctions from "./gameplayFunctions/pieceFunctions";

const GamePlay = () => {
      // TESTING _________________________----------------PLAY
  const submitWord = () => {
    console.log("submit word");
    dispatch(validatePlay(["test", "hello"]));
  };

  useEffect(() => {
    let localTileCount = localStorage.getItem("tiles");
    let localPlayers = localStorage.getItem("players");

    let initialDrawResult = pieceFunctions.initialDraw();

    if (!localTileCount) {
      console.log(initialDrawResult);
      localStorage.setItem(
        "tiles",
        JSON.stringify(initialDrawResult.updatedTiles)
      );
    }
    if (!localPlayers) {
      localStorage.setItem(
        "players",
        JSON.stringify(initialDrawResult.players)
      );
    }
  }, []);

  useEffect(() => {
    let localPlays = localStorage.getItem("plays")
    if(!localPlays){
      localStorage.setItem("plays", JSON.stringify([]))
    }
  }, [])

}


export default GamePlay
