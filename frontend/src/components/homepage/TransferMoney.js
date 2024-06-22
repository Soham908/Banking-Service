import { TransferMoneyFromAccountAction } from "../../actions/moneyAction";
import UserInput from "./UserInput";

const TransferMoney = () => {
  return (
    <UserInput
      title="Transfer Money"
      snackMessage="Money Transfered"
      label="recipient"
      TransactionFunc={TransferMoneyFromAccountAction}
    />
  );
};

export default TransferMoney;
