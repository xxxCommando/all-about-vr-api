// src/main.controller.ts

import { Application } from 'express';
import { requireJWTAuthentication, loggedMiddleware } from './middlewares/auth';
import ApiService from './services/api.service';
import GameService from './services/games.service';
import HeadsetService from './services/headsets.service';
import Model3dService from './services/model3d.service';
import AuthService from './services/auth.service';

export default class Controller {
  constructor(private app: Application) {
    this.routes();
  }

  public routes(): void {
    // List of endpoint available
    this.app.route('/').all((req, res) => ApiService.endPointsList(req, res));

    // Auth
    this.app.route('/register').post((req, res) => AuthService.register(req, res));
    this.app.route('/login').post((req, res) => AuthService.login(req, res));
    this.app.use('/user', requireJWTAuthentication(), loggedMiddleware);
    // Games routes
    this.app.route('/games').get((req, res) => GameService.getGames(req, res));

    // Model3d routes
    this.app.route('/3d').get((req, res) => Model3dService.getModel3d(req, res));

    // Headsets Routes
    this.app.route('/headsets').get((req, res) => HeadsetService.getHeadsets(req, res));
  }
}
