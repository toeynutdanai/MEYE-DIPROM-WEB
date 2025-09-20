import OEEDashboardComponents from "../components/OEEDashboard";
import useOEEDashboard from "../hooks/useOEEDashboard";

function OEEDashboard() {
  const oeeDashboardProps = useOEEDashboard();
  console.log('Props from hook:', oeeDashboardProps);
  return <OEEDashboardComponents {...oeeDashboardProps} />;
}

export default OEEDashboard;