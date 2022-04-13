import axios from "axios"

const baseUrl = "http://localhost:8000"
const herokuDB = ""

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login: async function(body){
        return await axios.post(baseUrl + "/auth/login", body)
    },
    register: async function(body){
        return await axios.post(baseUrl + "/auth/register", body)
    },
    getUser: async function(token){
        return await axios.get(baseUrl + "/auth/get-user/" + token)
    }
}