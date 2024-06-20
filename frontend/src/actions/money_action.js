import axios from "axios";

const port = process.env.REACT_APP_BACKEND_PORT_URL + "/usermoney"

export const AddMoneyToUserAccount = async (data) => {
  const url = port + "/add-money";
  const addMoney = await axios.post(url, data);
  return addMoney.data;
};

export const TransferMoneyFromAccount = async (data) => {
  const url = port + "/transfer-money";
  const transfer = await axios.post(url, data);
  return transfer.data;
};

export const checkAccountBalance = async (username) => {
  try {
    const url = port + "/balance/" + username
    const checkBalance = await axios.get(url)
    return checkBalance.data
  } catch (error) {
    console.log(error);
    return { success: false }
  }
}
