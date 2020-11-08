// src/services/auth.service.ts

import { Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { ACCESS_TOKEN_SECRET } from '../constants/api.constants';

import User from '../models/users/users.model';
import { IUser } from '../models/users/users.types';
import RequestUtil from './request.service';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    iat: number;
  }
}

export default class AuthService {
  static async register(req: Request, res: Response): Promise<Response> {
    const { miss, extra, ok } = RequestUtil.checkFields(
      ['login', 'password'],
      Object.entries(req.body).length !== 0 ? Object.keys(req.body) : [],
    );
    if (!ok) {
      return res.status(400).json(RequestUtil.apiFieldsErrorReponse(miss, extra));
    }
    const { login } = req.body;
    const password: string = bcrypt.hashSync(req.body.password, 10);
    try {
      const user: IUser | null = await User.findOne({
        login,
      }).exec();
      if (user) {
        return res.status(409).json(RequestUtil.apiErrorResponse('User already exist.'));
      }
      const newUser: IUser = await User.create({
        login,
        password,
      });
      return res
        .status(201)
        .json(RequestUtil.apiSuccessResponse('User successfully created.', newUser.toJSON()));
    } catch (error) {
      return res.status(500).json(RequestUtil.apiErrorResponse('User cannot be created.', error));
    }
  }

  static async login(req: Request, res: Response): Promise<Response> {
    const { miss, extra, ok } = RequestUtil.checkFields(
      ['login', 'password'],
      Object.entries(req.body).length !== 0 ? Object.keys(req.body) : [],
    );
    if (!ok) {
      return res.status(400).json(RequestUtil.apiFieldsErrorReponse(miss, extra));
    }
    const { login } = req.body;
    const { password } = req.body;
    try {
      const user: IUser | null = await User.findOne({
        login,
      }).exec();
      if (user) {
        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(401).json(RequestUtil.apiErrorResponse('Wrong password.'));
        }
        const accessToken = jsonwebtoken.sign({ id: user.id }, ACCESS_TOKEN_SECRET);
        return res.status(200).json(RequestUtil.apiSuccessResponse('User found.', { accessToken }));
      }
      return res.status(404).json(RequestUtil.apiErrorResponse('User not found.'));
    } catch (error) {
      return res.status(500).json(RequestUtil.apiErrorResponse('User cannot be found.', error));
    }
  }
}
