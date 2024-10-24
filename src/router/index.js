import Data from '@/pages/Data';
import Login from '@/pages/Login';
import Home from '@/pages/Home';

const routes = [{
    path: "/",
    component: Home
  },
  {
    path: "/data",
    component: Data
  },
  {
    path: "/login",
    component: Login
  }
];

export default routes