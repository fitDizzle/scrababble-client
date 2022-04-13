import axios from "axios"

const baseUrl = "http://localhost:8000"
const herokuDB = "postgres://rgsfmkdctjvykl:af3b2530cd791b741a38e290e0"

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