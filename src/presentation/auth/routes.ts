import { Router } from "express";
import { AuthService } from '../services/auth.service';
import { AuthController } from "./controller";


export class AuthRoutes {

  static get routes(): Router {
    const router = Router();
    const controller = new AuthController(new AuthService());

    router.post('/register', controller.registerUser);

    return router;
  }
}