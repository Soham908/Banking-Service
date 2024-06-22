import axios from "axios";

const url = process.env.REACT_APP_BACKEND_PORT_URL + "/api/money"

export const AddMoneyToUserAccountAction = async (data) => {
  const addMoney = await axios.post(url + "/add-money-to-account", data);
  return addMoney.data;
};

export const TransferMoneyFromAccountAction = async (data) => {
  const transfer = await axios.post(url + "/transfer-money-from-account", data);
  return transfer.data;
};

export const checkAccountBalanceAction = async (username) => {
  try {
    const checkBalance = await axios.get(url + "/check-account-balance/" + username)
    return checkBalance.data
  } catch (error) {
    console.log(error);
    return { success: false }
  }
}
