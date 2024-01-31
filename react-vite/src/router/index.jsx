import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import BeerBrowse from '../components/Beer/BeerBrowse';
import BreweryBrowse from '../components/Brewery/BreweryBrowse';
import CreateBreweryForm from '../components/Forms/CreateBreweryForm'
import BreweryDetails from '../components/Brewery/BreweryDetails';
import UpdateBreweryForm from '../components/Forms/UpdateBreweryForm';
import UserProfile from '../components/UserProfile/UserProfile';
import BeerDetails from '../components/Beer/BeerDetails';
import CreateBeerForm from '../components/Forms/CreateBeerForm';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "/users/:user_id",
        element: <UserProfile />
      },
      {
        path: "/beers",
        element: <BeerBrowse />
      },
      {
        path: "/beers/:beer_id",
        element: <BeerDetails />
      },
      {
        path: "/beers/new",
        element: <CreateBeerForm />
      },
      {
        path: "/breweries",
        element: <BreweryBrowse />
      },
      {
        path: "/breweries/:brewery_id",
        element: <BreweryDetails />
      },
      {
        path: "/breweries/new",
        element: <CreateBreweryForm />
      },
      {
        path: "/breweries/:brewery_id/edit",
        element: <UpdateBreweryForm />
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
