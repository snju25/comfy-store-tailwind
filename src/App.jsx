import {
  HomeLayout,
  Landing,
  Error,
  Products,
  SingleProduct,
  Cart,
  About,
  Register,
  Login,
  Checkout,
  Orders,
} from './pages';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { loader as landingLoader } from './pages/Landing';
import { loader as singleProductLoader } from './pages/SingleProduct';
import { loader as checkoutLoader } from './pages/Checkout';
import { loader as productsLoader } from './pages/Products';
import { loader as ordersLoader } from './pages/Orders';
import { ErrorElement } from './component';
import {action as registeredAction} from "./pages/Register"
import {action as loginAction} from "./pages/Login"
import{action as checkoutAction} from "./component/CheckoutFrom"
import {store} from "./store"

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: landingLoader
      },
      {
        path: 'products',
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: productsLoader,
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: singleProductLoader,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      { path: 'about', 
        element: <About /> 
      },
      {
        path: 'checkout',
        element: <Checkout />,
        loader: checkoutLoader(store),
        action: checkoutAction(store),

      },
      {
        path: 'orders',
        element: <Orders />,
        loader: ordersLoader(store),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action:loginAction(store),
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action: registeredAction,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;