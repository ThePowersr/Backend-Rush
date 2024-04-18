import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.errors";
import { VendorService } from "../services/vendor.service";
import { CreateVendorDto } from "../../domain/dtos/vendors/create-vendor.dto";


export class VendorController {
  constructor(
    private readonly vendorService: VendorService,
  ) { }

  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  }

  createVendor = (req: Request, res: Response) => {

    const [error, createVendorDto] = CreateVendorDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.vendorService.createVendor(createVendorDto!)
      .then(vendor => res.status(201).json(vendor))
      .catch(error => this.handleError(error, res));
  }

  getAllVendor = (req: Request, res: Response) => {
    this.vendorService.getAllVendor()
      .then(vendor => res.status(201).json(vendor))
      .catch(error => this.handleError(error, res));
  }

}