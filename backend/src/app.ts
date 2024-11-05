import { FRONTEND_HOST_URL } from './constants/urls';
import 'reflect-metadata';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import { StatusCodes } from 'http-status-codes';
import { AppRouter } from '~/app.router';
import { AppError } from '~/errors/app.error';
import Injection from '~/injection/injection';
import InjectionContainer from '~/injection/injection-container';

const app = new Hono();

const appRouter = InjectionContainer.get<AppRouter>(Injection.AppRouter);

app.onError((err, c) => {
  if (err instanceof AppError) {
    c.status(err.statusCode);
    return c.json({ message: err.message });
  }
  c.status(StatusCodes.INTERNAL_SERVER_ERROR);
  return c.json({ message: 'Internal Server Error' });
});

app.use('*', secureHeaders());
app.use('*', cors({ origin: [FRONTEND_HOST_URL], credentials: true }));
app.use('/dist/*', serveStatic({ root: './' }));

app.route('/api/v1', appRouter.getRouter());
export default app;
