import { Document } from 'mongoose';

export interface IGame extends Document {
  index: Number,
  name: String,
  steam: String,
  summary: String,
  type: Number,
  platform: [Number],
}
