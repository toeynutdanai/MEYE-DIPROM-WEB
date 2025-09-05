import { Button, Result } from "antd";

const NotFound = () => {
  const onGoBack = () => {
    window.history.back();
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={onGoBack}>
          Go Back
        </Button>
      }
    />
  );
};

export default NotFound;
