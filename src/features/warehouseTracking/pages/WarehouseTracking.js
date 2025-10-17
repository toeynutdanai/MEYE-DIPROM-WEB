import WarehouseTrackingComponents from "../components/WarehouseTracking";
import useWarehouseTracking from "../hooks/useWarehouseTracking";

function WarehouseTracking() {
  const warehouseTrackingProps = useWarehouseTracking();
  return <WarehouseTrackingComponents {...warehouseTrackingProps} />;
}

export default WarehouseTracking;