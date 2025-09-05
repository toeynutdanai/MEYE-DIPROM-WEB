import HomeComponents from "../components/Home";
import useHome from "../hooks/useHome";

function Home() {
  const homeProps = useHome();
  return <HomeComponents {...homeProps} />;
}

export default Home;
