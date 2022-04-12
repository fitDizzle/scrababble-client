

export const useUpdateLocalStorage = (newState, prevState, type) => {
  if (type === "player") {
    let parsedPlayers = JSON.parse(localStorage.getItem("players"));
    if(newState.username !== ""){
      let newLocalPlayers = {
        ...parsedPlayers,
        player: newState
      }
      localStorage.removeItem("players")
      localStorage.setItem("players", JSON.stringify(newLocalPlayers))
    }

  } else if (type === "ai") {
    let parsedPlayers = JSON.parse(localStorage.getItem("players"));
    if(newState.level !== ""){
      let newLocalPlayers = {
        ...parsedPlayers,
        ai: newState
      }
      localStorage.removeItem("players")
      localStorage.setItem("players", JSON.stringify(newLocalPlayers))
    }

  } else {
    localStorage.removeItem(type);
    localStorage.setItem(type, JSON.stringify(newState));
  }
};
