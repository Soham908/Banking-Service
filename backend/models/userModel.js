const { default: mongoose } = require("mongoose");

const notification = new mongoose.Schema(
  {
    notificationContent: { type: String, required: true },
    notificationAmount: { type: String, required: true },
    notificationStatus: { type: String },
    notificationContentFromApp: { type: String },
    notificationType: { type: String}
  },
  { timestamps: true }
);

const transaction = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: "String",
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    balanceAmount: {
      type: Number,
    },
    transactionHistory: [transaction],
    notificationList: [notification]
  },
  {
    collection: "userData",
  }
);

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
