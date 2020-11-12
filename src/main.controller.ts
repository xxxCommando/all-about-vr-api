// src/main.controller.ts

import { Application } from 'express';
import { requireJWTAuthentication, loggedMiddleware } from './middlewares/auth';
import ApiService from './services/api.service';
import GameService from './services/games.service';
import HeadsetService from './services/headsets.service';
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

    // Headsets routes
    this.app.route('/headsets').post((req, res) => HeadsetService.getHeadsets(req, res));
    this.app.use(
      '/user',
      requireJWTAuthentication(),
      loggedMiddleware,
    );
    // Games routes
    this.app.route('/games').get((req, res) => GameService.getGames(req, res));

    // Headsets Routes
    this.app.route('/headsets').get((req, res) => HeadsetService.getHeadsets(req, res));
  }
}
