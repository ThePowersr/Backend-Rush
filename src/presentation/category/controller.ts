import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.errors";
import { CategoryService } from "../services/category.service";
import { CreateCategoryVendorDto } from "../../domain/dtos/category/create-category-vendor.dto";
import { CreateProductCategoryDto } from "../../domain/dtos/category/create-product-category.dto";

export class CategoryController {

  constructor(
    private readonly categoryService: CategoryService,
  ) { }

  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  }

  // Post
  createCategory = (req: Request, res: Response) => {
    const [error, categoryDto] = CreateCategoryVendorDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.categoryService.createCategoryVendor(categoryDto!)
      .then(category => res.status(201).json(category))
      .catch(error => this.handleError(error, res));
  }

  createProductCategory = (req: Request, res: Response) => {
    const [error, categoryProductDto] = CreateProductCategoryDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.categoryService.createProductCategory(categoryProductDto!)
      .then(category => res.status(201).json(category))
      .catch(error => this.handleError(error, res));
  }

  // Get
  getAllCategory = (req: Request, res: Response) => {
    this.categoryService.getAllCategoriesVendors()
      .then(category => res.status(201).json(category))
      .catch(error => this.handleError(error, res));
  }

  getAllCategoryByVendors = (req: Request, res: Response) => {
    const { vendorId = '' } = req.params;
    const vendorInt = parseInt(vendorId);
    this.categoryService.getAllCategoriesByVendors(vendorInt)
      .then(vendorId => res.status(201).json(vendorId))
      .catch(error => this.handleError(error, res));
  }

}