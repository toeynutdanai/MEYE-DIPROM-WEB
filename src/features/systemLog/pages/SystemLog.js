import SystemLogComponents from "../components/SystemLog";
import useSystemLog from "../hooks/useSystemLog";

function SystemLog() {
  const systemLogProps = useSystemLog();
  return <SystemLogComponents {...systemLogProps} />;
}

export default SystemLog;