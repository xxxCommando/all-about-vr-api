// src/services/auth.service.ts

import { Request, Response } from 'express';

import Game from '../models/games/games.model';
import { IGame } from '../models/games/games.types';
import RequestUtil from './request.service';

export default class GameService {
  static async getGames(req: Request, res: Response): Promise<Response> {
    try {
      const games: IGame[] | null = await Game.find().exec();
      if (games?.length) {
        return res.status(200).json(RequestUtil.apiSuccessResponse('Games found.', { games }));
      }
      return res.status(404).json(RequestUtil.apiErrorResponse('Games not found.'));
    } catch (error) {
      return res.status(500).json(RequestUtil.apiErrorResponse('Games cannot be found.', error));
    }
  }
}
