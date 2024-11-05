import { createBrowserRouter } from 'react-router-dom';
import BasicLayout from './layout/BasicLayout';
import NotFoundPage from './pages/error/NotFound';
import MainPage from './pages/index';
import SignInPage from './pages/sign-in/SignInPage';
import AuthLayout from './layout/AuthLayout';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignInPage />
      },
      {
        element: <BasicLayout />,
        children: [
          {
            path: '/',
            element: <MainPage />
          }
        ]
      }
    ],
    errorElement: <NotFoundPage />
  }
]);

export default router;
