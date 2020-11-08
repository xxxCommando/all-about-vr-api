// src/main.controller.ts

import { Application } from 'express';
import { requireJWTAuthentication, loggedMiddleware } from './middlewares/auth';
import ApiService from './services/api.service';
import AuthService from './services/auth.service';

export default class Controller {
  private apiService: ApiService;

  private authService: AuthService;

  constructor(private app: Application) {
    this.apiService = new ApiService();
    this.authService = new AuthService();
    this.routes();
  }

  public routes(): void {
    // List of endpoint available
    this.app.route('/').all((req, res) => ApiService.endPointsList(req, res));

    // Auth
    this.app.route('/register').post((req, res) => AuthService.register(req, res));
    this.app.route('/login').post((req, res) => AuthService.login(req, res));

    // Middleware user auth
    this.app.use(
      '/user',
      requireJWTAuthentication(),
      loggedMiddleware,
    );

    // User routes
    this.app.route('/user/info').post((req, res) => ApiService.showInformation(req, res));
  }
}
