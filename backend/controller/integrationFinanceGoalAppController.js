const userModel = require("../models/userModel");
const axios = require('axios')
require('dotenv')

// the route for this function  => /api/integrate-app/finance-goal-app/reserve-funds-request (post)
// data received { goalName , goalReserveAmount
// goalBankVerificationStatus ,requestType
// applicationName, username }
exports.reserveFundsRequestControllerFunc = async (req, res) => {
  // reserve funds request received, now what, create a notification object inside the user document
  try {
    const data = req.body;
    console.log(data);
    await userModel.findOneAndUpdate(
      { username: data.username },
      {
        $push: {
          notificationList: {
            notificationContent: data.goalName,
            notificationAmount: data.goalReserveAmount,
            notificationStatus: data.goalBankVerificationStatus,
            notificationType: data.requestType,
            notificationContentFromApp: data.applicationName,
          },
        },
      }
    );
    res.json({
      success: true,
      message: "request notification created"
    })
  } catch (error) {
    console.log(error);
    res.json({
        success: false,
        message: "error occured",
        error
    })
  }
};

// response by the notification that was created, could be accepted or rejected
// first update the user documnet of bank and then send request to the goal app
exports.reserveFundsResponseControllerFunc = async (req, res) => {
  try {
    const financeGoalBackendURL = process.env.FINANCE_GOAL_URL + "/api/bank/reserve-fund-response"
    const data = req.body
    console.log(financeGoalBackendURL);
    const reserveFundResponse = await userModel.findOne({ username: data.username })
    const notification = reserveFundResponse.notificationList.find(noti => noti.notificationContent === data.goalName)
    console.log(notification);
    notification.notificationStatus = data.bankStatus
  
    await reserveFundResponse.save()
  
    // now pass a request to the goal backend
    await axios.post(financeGoalBackendURL, {
      username: data.username,
      goalName: data.goalName,
      bankStatus: data.bankStatus
    })
    res.json({
      success: true,
      message: "response has been sent to finance goal app"
    })
  } catch (error) {
    console.log(error);
  }

}
