import { Outlet } from "react-router-dom";
import Page404 from "./pages/Page404/Page404";
import { routes } from "../src/constants";
import ProductListPage from "./pages/Product/ProductListPage";
import ProductCreatePage from "./pages/Product/ProductCreatePage";
import CartPage from "./pages/Cart/CartPage";

const getRoutes = (user) => [
  {
    path: routes.homepage,
    element: <Outlet />,
    children: [
      { path: routes.homepage, element: <ProductListPage /> },
      { path: routes.productAdd, element: <ProductCreatePage /> },
      { path: routes.cart, element: <CartPage /> },
    ],
  },
  {
    path: "",
    element:<Page404 />,
  },
];

export default getRoutes;
