import axios from "axios";

const baseUrl = "https://scrababble-game-server-941f3c890750.herokuapp.com";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getSettings: async function (username, token) {
    return await axios.get(baseUrl + `/settings/${username}`, {
      headers: {
        authorization: token,
        scope: "Update user settings"
      }
    });
  },
  updateSettings: async function (body, token) {
    const { name } = body;
    return await axios.get(baseUrl + "/settings/update/" + name, {
      headers: {
        authorization: token,
        scope: "Update user settings"
      }
    })
  },
  resetSettings: async function (username, token) {
    return await axios.get(baseUrl + `/settings/reset/${username}`, {
      headers: {
        authorization: token,
        scope: "Update user settings"
      }
    });
  },
};
