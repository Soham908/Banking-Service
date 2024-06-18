import { TransferMoneyFromAccount } from "../../actions/money_action";
import UserInput from "./UserInput";

const TransferMoney = () => {
  return (
    <UserInput
      title="Transfer Money"
      snackMessage="Money Transfered"
      label="recipient"
      TransactionFunc={TransferMoneyFromAccount}
    />
  );
};

export default TransferMoney;
