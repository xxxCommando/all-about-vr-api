import { model } from 'mongoose';
import { IGame } from './games.types';
import GameSchema from './games.schema';

const Game = model<IGame>('game', GameSchema);
export default Game;
