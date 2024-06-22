import { AddMoneyToUserAccountAction } from "../../actions/moneyAction";
import UserInput from "./UserInput";

const AddMoney = () => {
  return (
    <UserInput
      title="Add Money"
      snackMessage="Money Added Successfully"
      label="description"
      TransactionFunc={AddMoneyToUserAccountAction}
    />
  );
};

export default AddMoney;
