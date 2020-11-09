import { Schema } from 'mongoose';

const GameSchema = new Schema({
  login: String,
  password: String,
  dateOfEntry: {
    type: Date,
    default: new Date(),
  },
  lastUpdated: {
    type: Date,
    default: new Date(),
  },
});
export default GameSchema;
