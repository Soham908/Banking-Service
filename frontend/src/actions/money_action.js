import axios from "axios";

const port = process.env.REACT_APP_BACKEND_PORT_URL

export const AddMoneyToUserAccount = async (data) => {
  const url = port + "/userMoney/addMoney";
  const addMoney = await axios.post(url, data);
  return addMoney.data;
};

export const TransferMoneyFromAccount = async (data) => {
  const url = port + "/userMoney/transferMoney";
  const transfer = await axios.post(url, data);
  return transfer.data;
};
