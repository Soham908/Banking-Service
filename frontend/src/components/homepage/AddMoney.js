import { AddMoneyToUserAccount } from "../../actions/money_action";
import UserInput from "./UserInput";

const AddMoney = () => {
  return (
    <UserInput
      title="Add Money"
      snackMessage="Money Added Successfully"
      label="description"
      TransactionFunc={AddMoneyToUserAccount}
    />
  );
};

export default AddMoney;
