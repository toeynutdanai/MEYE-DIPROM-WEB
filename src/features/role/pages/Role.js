import RoleComponents from "../components/Role";
import useRole from "../hooks/useRole";

function Role() {
  const roleProps = useRole();
  return <RoleComponents {...roleProps} />;
}
export default Role;