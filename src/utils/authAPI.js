import axios from "axios"

const baseUrl = "http://localhost:8000"
const herokuDB = "https://scrababble-game-server-941f3c890750.herokuapp.com/"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login: async function(body){
        return await axios.post(herokuDB + "/auth/login", body)
    },
    register: async function(body){
        return await axios.post(herokuDB + "/auth/register", body)
    },
    getUser: async function(token){
        return await axios.get(herokuDB + "/auth/get-user/" + token)
    }
}