import { Document } from 'mongoose';

export interface IGame extends Document {
  index: String,
  name: String,
  steam: String,
  summary: String,
  type: Number,
  platform: [Number],
}
