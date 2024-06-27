const userModel = require("../models/userModel");
const axios = require("axios");
require("dotenv");

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
      message: "request notification created",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "error occured",
      error,
    });
  }
};

// the route for this function  => /api/integrate-app/finance-goal-app/reserve-funds-response (post)
// data that is coming in => { username, goalName, bankStatus, reserveAmount? }
exports.reserveFundsResponseControllerFunc = async (req, res) => {
  try {
    const financeGoalBackendURL =
      process.env.FINANCE_GOAL_URL + "/api/bank/reserve-fund-response";
    console.log(financeGoalBackendURL);
    const data = req.body;
    console.log(financeGoalBackendURL);
    const reserveFundResponse = await userModel.findOne({
      username: data.username,
    });
    const notification = reserveFundResponse.notificationList.find(
      (noti) => noti.notificationContent === data.goalName
    );
    console.log(notification);
    notification.notificationStatus = data.bankStatus;
    if (data.reserveAmount)
      reserveFundResponse.reservedFunds += data.reserveAmount;

    await reserveFundResponse.save();

    // now pass a request to the goal backend
    await axios.post(financeGoalBackendURL, {
      username: data.username,
      goalName: data.goalName,
      bankStatus: data.bankStatus,
    });
    res.json({
      success: true,
      message: "response has been sent to finance goal app",
    });
  } catch (error) {
    console.log(error);
  }
};

// the route for this function  => /api/integrate-app/finance-goal-app/reserve-funds-amount-updated (post)
exports.reserveFundsAmountUpdatedControllerFunc = async (req, res) => {
  try {
    const data = req.body;
    const userData = await userModel.findOne({ username: data.username });
    if (
      userData.balanceAmount -
        userData.reservedFunds -
        data.goalMoreReserveAmount >=
      1000
    ) {
      userData.reservedFunds += data.goalMoreReserveAmount;
      userData.notificationList.push({
        notificationContent: data.goalName,
        notificationAmount: data.goalMoreReserveAmount,
        notificationStatus: data.goalBankVerificationStatus,
        notificationType: data.requestType,
        notificationContentFromApp: data.applicationName,
      });
      userData.save()
      
      res.json({
        success: true,
        message: "money reserve update success",
      });
    } else {
      res.json({
        success: false,
        message:
          "insufficient balace, min bal in bank should be at least 1000 after reserve funds",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error
    })
  }
};

// the route for this function  => /api/integrate-app/finance-goal-app/release-funds-request (post)
// request from goal app, the goal is deleted and funds needs to be released
// data incoming => { username, goalname }
exports.releaseFundsRequestControllerFund = async (req, res) => {
  try {
    const data = req.body;
    const releaseFunds = await userModel.findOne({ username: data.username });

    const notification = releaseFunds.notificationList.find(
      (noti) => noti.notificationContent === data.goalName
    );

    if (notification.notificationStatus === "verified") {
      releaseFunds.reservedFunds -= parseFloat(data.goalAmount);
    } else if (notification.notificationStatus === "pending") {
      notification.notificationStatus = "rejected";
    } else
      return res.json({
        success: false,
        message: "notification does not exist",
      });

    releaseFunds.notificationList.push({
      notificationContent: data.goalName,
      notificationAmount: notification.notificationAmount,
      notificationStatus: "deleted",
      notificationType: "release funds",
      notificationContentFromApp: notification.notificationContentFromApp,
    });

    releaseFunds.save();
    res.json({
      success: true,
      message: "Goal status = deleted, and the funds were released",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error,
    });
  }
};
