import axios from "axios";
const url = process.env.REACT_APP_BACKEND_PORT_URL;

export const getNotificationsAction = async (username) => {
  try {
    console.log(url);
    const notification = await axios.get(
      url + `/notification/get-notification/${username}`
    );
    return notification.data;
  } catch (error) {
    return { success: false };
  }
};

export const reserveFundNotificationResponse = async (data) => {
  try {
    const response = await axios.post(
      url + "/integration/fin-goal/reserve-funds-response",
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
