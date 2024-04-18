import { Router } from "express";
import { VendorController } from "./controller";
import { VendorService } from "../services/vendor.service";

export class VendorRoutes {
  static get routes(): Router {

    const router = Router();
    const controller = new VendorController(new VendorService);

    router.post('/', controller.createVendor);
    router.get('/', controller.getAllVendor)

    return router;
  }
}