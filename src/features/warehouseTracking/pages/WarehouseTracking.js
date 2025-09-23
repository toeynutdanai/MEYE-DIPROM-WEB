import WarehouseTrackingComponents from "../components/WarehouseTracking";
import useWarehouseTracking from "../hooks/useWarehouseTracking";

function WarehouseTracking() {
  const warehouseTrackingProps = useWarehouseTracking();
  console.log(warehouseTrackingProps)
  return <WarehouseTrackingComponents {...warehouseTrackingProps} />;
}

export default WarehouseTracking;