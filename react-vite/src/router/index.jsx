import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import BeerBrowse from '../components/Beer/BeerBrowse';
import BreweryBrowse from '../components/Brewery/BreweryBrowse';
import CreateBreweryForm from '../components/Forms/CreateBreweryForm'
import BreweryDetails from '../components/Brewery/BreweryDetails';
import UpdateBreweryForm from '../components/Forms/UpdateBreweryForm';
import UserProfile from '../components/UserProfile/UserProfile';
import BeerDetails from '../components/Beer/BeerDetails';
import CreateBeerForm from '../components/Forms/CreateBeerForm';
import UpdateBeerForm from '../components/Forms/UpdateBeerForm';
import LandingLayout from './LandingLayout';
import LandingPage from '../components/LandingPage/LandingPage';
import NotFound from '../components/NotFound/NotFound';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },

    ]
  },
  {
    element: <Layout />,
    children: [
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
        path: "/beers/:beer_id/edit",
        element: <UpdateBeerForm />
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
        path: "/error",
        element: <NotFound />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ],
  },
]);
