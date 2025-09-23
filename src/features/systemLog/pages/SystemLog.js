import SystemLogComponents from "../components/SystemLog";
import useSystemLog from "../hooks/useSystemLog";

function SystemLog() {
  const systemLogProps = useSystemLog();
  console.log(systemLogProps)
  return <SystemLogComponents {...systemLogProps} />;
}

export default SystemLog;