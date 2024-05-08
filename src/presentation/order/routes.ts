import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class OrderRouter {

  static get routes(): Router {
    const router = Router();


    //GET
    router.get('/',);
    router.post('/', [AuthMiddleware.validateToken],)


    return router;
  }

}