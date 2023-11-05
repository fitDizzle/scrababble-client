import axios from "axios";


const baseURL = "https://scrababble-game-server-941f3c890750.herokuapp.com"
const secondaryURL = "https://scrababble-word-server-09e7360a6b4e.herokuapp.com";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  validateWord: async function (words) {
    return await axios.get(secondaryURL + "/gameplay/word/check/" + words.words, {
      headers: {
        words: words.words,
        mults: words.multipliers
      }
    });
  },
  saveActiveGame: async function (body, token) {
    return await axios.post(baseURL + "/gameplay/save-game/active", body, {
      headers: {
        authorization: token,
        scope: "save active game"

      }
    })
  },
  updateActiveGame: async function (body, id, token) {
    return await axios.post(baseURL + "/gameplay/update-game/active/" + id, body, {
      headers: {
        authorization: token,
        scope: "update active game"
      }
    })
  },
  fetchActiveGames: async function(token){
    return await axios.get(baseURL + "/load/all-active", {
      headers: {
        authorization: token,
        scope: "fetch all saved games"
      }
    })
  },
  loadActiveGame: async function(id, token){
    return await axios.get(baseURL + "/load/active/" + id, {
      headers: {
        authorization: token,
        scope: "load saved game " + id 
      }
    })
  },
  deleteActiveGame: async function (id, token) {
    return await axios.delete(baseURL + "/gameplay/delete-game/active/" + id,{
      headers: {
        authorization: token,
        scope: "delete game with id" + id
      }
    });
  },
};
