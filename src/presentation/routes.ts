import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { CategoryRoutes } from "./category/routes";
import { VendorRoutes } from "./vendor/routes";
import { ProductRoutes } from "./product/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/categories', CategoryRoutes.routes);
    router.use('/api/vendor', VendorRoutes.routes);
    router.use('/api/products', ProductRoutes.routes);

    return router;
  }
}