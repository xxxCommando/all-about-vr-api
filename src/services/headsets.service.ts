// src/services/auth.service.ts

import { Request, Response } from 'express';

import Headset from '../models/headsets/headsets.model';
import { IHeadset } from '../models/headsets/headsets.types';
import RequestUtil from './request.service';

export default class HeadsetService {
  static async getHeadsets(req: Request, res: Response): Promise<Response> {
    try {
      const headsets: IHeadset[] | null = await Headset.find().exec();
      if (headsets?.length) {
        return res.status(200).json(RequestUtil.apiSuccessResponse('Headsets found.', { headsets }));
      }
      return res.status(404).json(RequestUtil.apiErrorResponse('Headsets not found.'));
    } catch (error) {
      return res.status(500).json(RequestUtil.apiErrorResponse('Headsets cannot be found.', error));
    }
  }
}
