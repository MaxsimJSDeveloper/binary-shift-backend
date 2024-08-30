 import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
 import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

import { initMongoDB } from './db/initMongoDB.js';
import { startServer } from './server.js';

const bootstrap = async () => {
  await initMongoDB();
 await createDirIfNotExists(TEMP_UPLOAD_DIR);
 await createDirIfNotExists(UPLOAD_DIR);
  startServer();
};

void bootstrap();
