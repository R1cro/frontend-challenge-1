import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '~/stores/AuthStore';

const AuthLayout = observer(() => {
  const { pathname } = useLocation();
  const isSignInPage = pathname === '/sign-in';

  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated && isSignInPage) return <Navigate to="/" />;
  if (!isAuthenticated && !isSignInPage) return <Navigate to="/sign-in" />;

  return <Outlet />;
});

export default AuthLayout;
