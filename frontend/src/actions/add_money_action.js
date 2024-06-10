import axios, {} from 'axios'
import {BACKEND_PORT_URL} from "./../constants/Constants"

export const AddMoneyToUserAccount = async (data) => {
    const url = BACKEND_PORT_URL + "/userMoney/addMoney"
    console.log(url);
    const addMoney = await axios.post("http://localhost:7000/userMoney/addMoney", data)
    return addMoney.data
}

