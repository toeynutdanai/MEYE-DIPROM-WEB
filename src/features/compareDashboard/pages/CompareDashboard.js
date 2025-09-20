import CompareDashboardComponents from "../components/CompareDashboard";
import useCompareDashboard from "../hooks/useCompareDashboard";

function CompareDashboard() {
  const compareDashboardProps = useCompareDashboard();
  console.log('Props from hook:', compareDashboardProps);
  return <CompareDashboardComponents {...compareDashboardProps} />;
}

export default CompareDashboard;