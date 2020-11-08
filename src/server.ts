// src/server.ts

import * as dotenv from 'dotenv';
import log from 'loglevel';

import app from './app';
import connect from './connect';
import { PORT, MONGO_URL } from './constants/api.constants';

dotenv.config();

connect({ db: MONGO_URL });

app.listen(PORT, () => log.log(`Listening on port ${PORT}`));
