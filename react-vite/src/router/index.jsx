import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import BeerBrowse from '../components/Beer/BeerBrowse';
import BreweryBrowse from '../components/Brewery/BreweryBrowse';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "/beers",
        element: <BeerBrowse />
      },
      {
        path: "/breweries",
        element: <BreweryBrowse />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
