import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Tasks from '../pages/Tasks';
import Profile from '../pages/Profile';
import Archive from '../pages/Archive';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PrivateRoute from '../components/layouts/PrivateRoute';
import About from '../pages/About';
const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Tasks />,
      },
      {
        path: '/archive',
        element: <Archive />,
      },
     
     
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/about',
        element: <About/>,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

export default routes;
