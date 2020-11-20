import { Schema } from 'mongoose';

const GameSchema = new Schema({
  index: Number,
  name: String,
  steam: String,
  summary: String,
  type: Number,
  platform: [Number],
});
export default GameSchema;
