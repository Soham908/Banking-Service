import axios from "axios"

const port = process.env.REACT_APP_BACKEND_PORT_URL

export const userLogin = async (data) => {
    const url = port + "/userAuth/login"
    const login = await axios.post(url, data)
    return login.data
}

export const userRegister = async (data) => {
    const url = port + "/userAuth/register-new"
    const register = await axios.post(url, data)
    return register.data
}

