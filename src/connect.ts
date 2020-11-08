// src/connect.ts

import mongoose from 'mongoose';
import log from 'loglevel';

type TInput = {
  db: string;
};
const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

export default ({ db }: TInput): void => {
  const connect = () => {
    mongoose
      .connect(db, options)
      .then(() => log.info(`Successfully connected to ${db}`))
      .catch((error) => {
        log.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
