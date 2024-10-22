import Index from '@/pages/Index'
import About from '@/pages/About'
import Login from '@/pages/Login';

const routes = [{
    path: "/",
    component: Index
  },
  {
    path: "/about",
    component: About
  },
  {
    path: "/login",
    component: Login
  }
];

export default routes