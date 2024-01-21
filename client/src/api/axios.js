import axios from "axios";

const instance =axios.create({
    baseURL:'http://localhost:3110/api',
    withCredentials:true
})

export default instance;