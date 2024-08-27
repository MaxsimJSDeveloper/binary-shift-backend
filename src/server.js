import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

// import { env } from './utils/env.js';
import router from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
// import { UPLOAD_DIR } from './constants/index.js';
// import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = 3000;

export const startServer = () => {
  const app = express();

  app.use(cors());

  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(router);

  // app.use('/uploads', express.static(UPLOAD_DIR));
  // app.use('/api-docs', swaggerDocs());

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
