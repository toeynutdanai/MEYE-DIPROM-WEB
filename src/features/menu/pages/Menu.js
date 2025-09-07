import MenuComponents from "../components/Menu";
import useMenu from "../hooks/useMenu";

function MenuHome() {
  const menuProps = useMenu();
  return <MenuComponents {...menuProps} />;
}

export default MenuHome;