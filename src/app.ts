import express from 'express';
import helmet from 'helmet';
import { route } from './router';

const HTTP_PORT = process.env.PORT || 3000;
const app = express();

// sets some sensible HTTP headers since
// it's directly connected to internet
app.use(helmet());

app.use(express.json());

async function start(port = HTTP_PORT) {
  route(app);
  return app.listen(port);
}

start()
  .then(() =>
    console.log(`OpenAI Moderation Social App started on port ${HTTP_PORT}`)
  )
  .catch((err) => {
    console.error('Error, shutting down service: ', JSON.stringify(err));
    process.exit(1);
  });
