import { Document } from 'mongoose';

export interface IGame extends Document {
  login: string;
  password: string;
  dateOfEntry?: Date;
  lastUpdated?: Date;
}
