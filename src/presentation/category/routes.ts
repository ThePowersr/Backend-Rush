import { Router } from "express";
import { CategoryController } from "./controller";
import { CategoryService } from "../services/category.service";


export class CategoryRoutes {

  static get routes(): Router {
    const router = Router();
    const controller = new CategoryController(new CategoryService);

    router.post('/', controller.createCategory);
    router.post('/product', controller.createProductCategory);
    router.get('/', controller.getAllCategory);
    router.get('/vendor/:vendorId', controller.getAllCategoryByVendors);


    return router;
  }
}