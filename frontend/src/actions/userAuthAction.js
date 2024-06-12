import axios from "axios"
import { BACKEND_PORT_URL } from "../constants/Constants"


export const userLogin = async (data) => {
    const url = BACKEND_PORT_URL + "/userAuth/login"
    const login = await axios.post(url, data)
    return login.data
}

export const userRegister = async (data) => {
    const url = BACKEND_PORT_URL + "/userAuth/register-new"
    const register = await axios.post(url, data)
    return register.data
}

