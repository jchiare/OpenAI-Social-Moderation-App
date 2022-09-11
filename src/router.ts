import { moderatedReplies } from './controllers/moderatedReplies.controller';
import { home } from './controllers/main.controller';
import type { Express } from 'express';

export function route(app: Express) {
  app.post('/twitter/get-moderated-replies', moderatedReplies);
  app.get('/', home);
}
