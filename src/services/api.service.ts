// src/services/api.service.ts

import { Request, Response, Express } from 'express';
import getEndpoints from 'express-list-endpoints';
import User from '../models/users/users.model';
import RequestUtil from './request.service';
import { AuthRequest } from './auth.service';

export default class ApiService {
  static endPointsList(req: Request, res: Response): Response {
    return res.status(200).json(getEndpoints(<Express>req.app));
  }

  static async showInformation(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const user = await User.findById(req.user?.id).exec();
      if (user) {
        return res.status(200).json(RequestUtil.apiSuccessResponse('User found', user.toJSON()));
      }
      return res.status(400).json(RequestUtil.apiErrorResponse('User not found.'));
    } catch (error) {
      return res.status(500).json(RequestUtil.apiErrorResponse('Order cannot be get.', error));
    }
  }
}
