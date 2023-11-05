import axios from "axios";

const baseUrl = "https://scrababble-word-server-09e7360a6b4e.herokuapp.com";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getRelativeWords: async function (letters) {
    return await axios.get(baseUrl + `/search/relative/${letters}`);
  },
  getAllWords: async function (letters) {
    console.log(letters, 'LETTERS')
    return await axios.get(baseUrl + `/search/filter/${letters}`);
  },
};
