import { Schema } from 'mongoose';

const GameSchema = new Schema({
  index: String,
  name: String,
  steam: String,
  summary: String,
  type: Number,
  platform: [Number],
});
export default GameSchema;
