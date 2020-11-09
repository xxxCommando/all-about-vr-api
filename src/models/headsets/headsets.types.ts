import { Document } from 'mongoose';

export interface IHeadset extends Document {
  login: string;
  password: string;
  dateOfEntry?: Date;
  lastUpdated?: Date;
}
