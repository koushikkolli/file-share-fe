import axios from "axios"
let url = "http://localhost:3001"
//let url = "http://localhost:3001"
export default axios.create({
    baseURL: url,

})