import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.errors";
import { ProductService } from '../services/product.service';
import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";

export class Productcontroller {

  constructor(
    private readonly productService: ProductService,
  ) { }

  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  }

  createProduct = (req: Request, res: Response) => {
    const [error, productDto] = CreateProductDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.productService.createProduct(productDto!)
      .then(product => res.status(201).json(product))
      .catch(error => this.handleError(error, res));
  }

  getAllProductByVendors = (req: Request, res: Response) => {
    const { id } = req.params;
    const idNumber = parseInt(id);

    this.productService.getAllProductByVendors(idNumber)
      .then(products => res.status(201).json(products))
      .catch(error => this.handleError(error, res));
  }
}