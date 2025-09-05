import { ConfigProvider } from "antd";
import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
} from "chart.js/auto";
import { RouterProvider } from "react-router-dom";
import "./i18n";
import "./index.css";
import router from "./routes";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const App = () => {
  return (
    <ConfigProvider>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
