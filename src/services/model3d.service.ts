// src/services/auth.service.ts

import { Request, Response } from 'express';

import Model3d from '../models/model3d/model3d.model';
import { IModel3d } from '../models/model3d/model3d.types';
import RequestUtil from './request.service';

export default class Model3dService {
  static async getModel3d(req: Request, res: Response): Promise<Response> {
    try {
      const model3d: IModel3d[] | null = await Model3d.find().exec();
      if (model3d?.length) {
        return res.status(200).json(RequestUtil.apiSuccessResponse('Model3d found.', { model3d }));
      }
      return res.status(404).json(RequestUtil.apiErrorResponse('Model3d not found.'));
    } catch (error) {
      return res.status(500).json(RequestUtil.apiErrorResponse('Model3d cannot be found.', error));
    }
  }
}
