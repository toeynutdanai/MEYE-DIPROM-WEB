import OEEDashboardComponents from "../components/OEEDashboard";
import useOEEDashboard from "../hooks/useOEEDashboard";

function OEEDashboard() {
  const oeeDashboardProps = useOEEDashboard();
  return <OEEDashboardComponents {...oeeDashboardProps} />;
}

export default OEEDashboard;