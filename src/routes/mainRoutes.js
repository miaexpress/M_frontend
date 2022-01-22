import Board from 'containers/Board';
import SignIn from 'containers/SignIn';
// import SignUp from 'containers/SignUp';
import NotFound from 'containers/NotFound';
// import Attachment from 'containers/Attachment';
import SignOut from 'containers/SignOut';
import Users from 'containers/Users';

const mainRoutes = [
  {
    exact: true,
    path: '/',
    name: 'Home',
    icon: 'home',
    component: Board,
    auth: true,
  },
  {
    path: '/signin',
    name: 'Sign In',
    icon: 'login',
    component: SignIn,
  },
  // {
  //   path: '/signup',
  //   name: 'Sign Up',
  //   hide: true,
  //   component: SignUp,
  // },
  {
    path: '/signout',
    name: 'Sign Out',
    component: SignOut,
    auth: true,
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    auth: true,
    permission: 'Admin',
  },
  {
    path: '',
    name: 'Others',
    icon: 'close-circle',
    auth: true,
    component: NotFound,
  },
];

export default mainRoutes;