import { createBrowserRouter } from 'react-router-dom';
import BasicLayout from './layout/BasicLayout';
import NotFoundPage from './pages/error/NotFound';
import SignInPage from './pages/sign-in/SignInPage';
import AuthLayout from './layout/AuthLayout';
import UploadPage from './pages/upload/UploadPage';

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
            element: <UploadPage />
          }
        ]
      }
    ],
    errorElement: <NotFoundPage />
  }
]);

export default router;
