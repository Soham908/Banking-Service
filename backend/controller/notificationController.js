const userModel = require("../models/userModel");

// the route for this function => /api/notification/get-notification/:username
// get method
exports.getNotification = async (req, res) => {
  try {
    const notification = await userModel.findOne(
      {
        username: req.params.username,
      },
      {
        notificationList: 1,
      }
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
