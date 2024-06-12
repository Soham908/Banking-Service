import axios from "axios";
import { BACKEND_PORT_URL } from "../constants/Constants";

export const AddMoneyToUserAccount = async (data) => {
  const url = BACKEND_PORT_URL + "/userMoney/addMoney";
  const addMoney = await axios.post(url, data);
  return addMoney.data;
};

export const TransferMoneyFromAccount = async (data) => {
  const url = BACKEND_PORT_URL + "/userMoney/transferMoney";
  const transfer = await axios.post(url, data);
  return transfer.data;
};
