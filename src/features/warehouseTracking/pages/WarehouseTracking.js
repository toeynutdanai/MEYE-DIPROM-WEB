import WarehouseTrackingComponents from "../components/WarehouseTracking";
import useWarehouseTracking from "../hooks/useWarehouseTracking";

function OEEDashboard() {
  const warehouseTrackingProps = useWarehouseTracking();
  return <WarehouseTrackingComponents {...warehouseTrackingProps} />;
}

export default OEEDashboard;