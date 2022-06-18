import { useRoutes } from "react-router-dom";
import getRoutes from "./routes";
import "./App.css";
import "./css/style.css";
import Layout from "./component/Layout/MainLayout";

function App() {

  const routing = useRoutes(getRoutes());

  return <><Layout> {routing}</Layout></>;
}

export default App;
