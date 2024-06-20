const { default: axios } = require("axios");
const userModel = require("../models/userModel");
require('dotenv')

exports.reserveFundsResponse = async (req, res) => {
    const url = process.env.FINANCE_GOAL_URL + "/api/bank/reserve-fund-response"
    try {
        const data = {
            username: req.body.username,
            goalName: req.body.goalName,
            bankStatus: req.body.bankStatus
        }
        const response = await axios.post(url, data)
        res.json({
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


exports.reserveFunds = async (req, res) => {
  try {
    const data = req.body;
    const notification = await userModel.findOneAndUpdate(
      { username: data.username },
      {
        $push: {
          notificationList: {
            notificationContent: data.goalName,
            notificationAmount: data.currentAmount,
            notificationContentFromApp: data.appName,
            notificationType: data.requestType,
            notificationStatus: "pending",
          },
        },
      },
      { new: true }
    );
    res.json({
      success: true,
      notification,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error,
    });
  }
};
