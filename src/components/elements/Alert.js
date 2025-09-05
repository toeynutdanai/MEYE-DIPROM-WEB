import { notification } from "antd";

const openStyledNotification = ({
  type = "success",
  message = "",
  className = "",
  description = "",
  resultObject = {},
}) => {
  let codeFromObj = null;
  let descFromObj = null;

  switch (type) {
    case "success":
      if (resultObject.data?.status) {
        codeFromObj = `Success`;
        descFromObj =
          resultObject?.data?.status?.details?.reduce(
            (accumulator, currentValue) =>
              `${accumulator}${currentValue.value}\n`,
            ""
          ) || resultObject?.data?.status?.description;
      }
      break;
    case "error":
      if (resultObject?.code) {
        codeFromObj = `Error (${resultObject.code})`;
        descFromObj = resultObject.message;
      } else if (resultObject.data?.status) {
        codeFromObj = `Error (${resultObject.data.status?.code})`;
        descFromObj =
          resultObject?.data?.status?.details?.reduce(
            (accumulator, currentValue) =>
              `${accumulator}${currentValue.value}\n`,
            ""
          ) || resultObject?.data?.status?.description;
      }
      break;
    default:
      // If type is not recognized, you can handle it here or do nothing
      break;
  }

  const notificationConfig = {
    className: className,
    style: {
      borderRadius: "8px",
      padding: "10px",
      border: "0.5px solid",
      closeIcon: "✖",
    },
  };

  if (type === "success") {
    notification.success({
      ...notificationConfig,
      message: message || codeFromObj || "Success",
      description: description || descFromObj,
      style: {
        ...notificationConfig.style,
        backgroundColor: "#f6ffed",
        borderColor: "#52c41a",
      },
    });
  } else if (type === "error") {
    notification.error({
      ...notificationConfig,
      message: codeFromObj || message || "Error! Please Try Again",
      description: descFromObj || description || message,
      style: {
        ...notificationConfig.style,
        backgroundColor: "#fff2f0",
        borderColor: "#ff4d4f",
      },
    });
  }
};

export default openStyledNotification;
