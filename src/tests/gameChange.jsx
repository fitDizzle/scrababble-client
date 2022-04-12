import { useEffect } from 'react'

const GameChange = () => {
  useEffect(() => {
    console.log("board changed...")

  }, [document.getElementsByClassName("game-board")[0]]);

}

export default GameChange
