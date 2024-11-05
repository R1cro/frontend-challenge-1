import { serve } from '@hono/node-server';

import app from '~/app';

serve({ fetch: app.fetch, port: 5555 });
console.log('Server is running on http://localhost:5555');
