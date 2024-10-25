import Data from '@/pages/Data';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Detail from '@/pages/Detail';
const routes = [{
    path: "/",
    component: Home
  },
  {
    path: "/data",
    component: Data
  },
  {
    path: "/detail",
    component: Detail
  },
  {
    path: "/login",
    component: Login
  }
];

export default routes