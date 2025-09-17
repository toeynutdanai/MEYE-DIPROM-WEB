import CompareDashboardComponents from "../components/CompareDashboard";
import useCompareDashboard from "../hooks/useCompareDashboard";

function CompareDashboard() {
  const compareDashboardProps = useCompareDashboard();
  return <CompareDashboardComponents {...compareDashboardProps} />;
}

export default CompareDashboard;