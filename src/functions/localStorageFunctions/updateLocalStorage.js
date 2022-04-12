

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    updatePlays: (statePlays, prevLocalPlays) => {
        // console.log("__________START LOCAL PLAY MOD___________")
        localStorage.removeItem("plays")
        localStorage.setItem("plays", JSON.stringify(statePlays))

        // console.log("__________START LOCAL PLAY MOD___________")

    },
    updatePlayer: (statePlayer, prevLocalPlayer) => {
        // console.log(statePlayers)
        // console.log("__________START LOCAL PLAYER MOD___________")
        let parsedPlayers = JSON.parse(localStorage.getItem("players"))
        // console.log(parsedPlayers)
        if(statePlayer.username !== ""){
              let newLocalPlayers = {
            ...parsedPlayers,
            player: statePlayer
        }
        // console.log(newLocalPlayers, "new")
        localStorage.removeItem("players")
        localStorage.setItem("players", JSON.stringify(newLocalPlayers))
        }
      
        // let parsed = JSON.parse(localStorage.getItem("players"))
        // console.log(prevLocalPlayers, "withing local storage function")
        // localStorage.removeItem("players")
        // localStorage.setItem("players", JSON.stringify(statePlayers))
        // console.log("__________END LOCAL PLAYER MOD___________")

    },
    updateAI: (stateAI, prevLocalAI) => {
        // console.log("__________START LOCAL AI MOD___________")
        let parsedPlayers = JSON.parse(localStorage.getItem("players"))
        // console.log(parsedPlayers)
        if(stateAI.level !== ""){
              let newLocalPlayers = {
            ...parsedPlayers,
            ai: stateAI
        }
        // console.log(newLocalPlayers, "new")
        localStorage.removeItem("players")
        localStorage.setItem("players", JSON.stringify(newLocalPlayers))
        }
      
        // let parsed = JSON.parse(localStorage.getItem("players"))
        // console.log(prevLocalPlayers, "withing local storage function")
        // localStorage.removeItem("players")
        // localStorage.setItem("players", JSON.stringify(statePlayers))
        // console.log("__________END LOCAL AI MOD___________")
    },
    updateTiles: (localTiles, stateTiles) => {
        // console.log(localTiles)
        // console.log(stateTiles)
        localStorage.removeItem("tiles")
        localStorage.setItem("tiles", JSON.stringify(stateTiles))
    }
}