import Data from '@/pages/Data';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Detail from '@/pages/Detail';
import User from '@/pages/User';
import UserInfo from '@/pages/UserInfo';
import Account from '../pages/Account';

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
  },
  {
    path: "/user",
    component: User
  },
  {
    path: "/userinfo",
    component: UserInfo
  },
  {
    path: "/account",
    component: Account
  },
  {
    path: "*",
    redirect: "/"
  }
];

export default routes