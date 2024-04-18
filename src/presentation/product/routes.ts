import { Router } from "express";
import { Productcontroller } from "./controller";
import { ProductService } from "../services/product.service";

export class ProductRoutes {


  static get routes(): Router {
    const router = Router();

    const controller = new Productcontroller(new ProductService);

    router.post('/create', controller.createProduct);

    // GET 
    router.get('/vendor/:id', controller.getAllProductByVendors);

    return router;
  }
}