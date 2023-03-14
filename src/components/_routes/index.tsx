import { type } from 'os';
import Home from '../_pages/Home';
import Profile from '../_pages/Profile';
import AuthRoute from './AuthRoute';
import NoAuthRoute from './NoAuthRoute';
interface route {
  path: string;
  component: () => JSX.Element;
  auth?: boolean;
  layout?: null | (() => JSX.Element);
}
const routes: route[] = [
  { path: '/', component: Home, layout: null },
  { path: '/profile', component: Profile, layout: null },
];

export { routes };
export { AuthRoute, NoAuthRoute };
