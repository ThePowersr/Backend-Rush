import prisma from "../../data/database";
import { CreateCategoryVendorDto } from "../../domain/dtos/category/create-category-vendor.dto";
import { CustomError } from "../../domain/errors/custom.errors";
import { CreateProductCategoryDto } from '../../domain/dtos/category/create-product-category.dto';

export class CategoryService {

  async createCategoryVendor(createCategoryDto: CreateCategoryVendorDto) {

    const { name, available, image } = createCategoryDto;

    const categoryExist = await prisma.category.findFirst({ where: { name: name.trim() } });
    if (categoryExist) throw CustomError.badRequest('Category already exists');

    try {
      const category = await prisma.category.create({
        data: {
          name: name.trim(),
          available,
          image
        }
      });
      return {
        ...category
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getAllCategoriesVendors() {
    try {
      const categories = await prisma.category.findMany();
      return {
        ...categories
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async createProductCategory(createProductCategoryDto: CreateProductCategoryDto) {

    const { name, available, image, vendorId } = createProductCategoryDto;
    const vendorExist = await prisma.vendors.findFirst({ where: { id: vendorId } })

    if (!vendorExist) throw CustomError.badRequest('vendor not exists');

    try {
      const category = await prisma.product_category.create({
        data: {
          name: name.trim(),
          available,
          image,
          vendor_id: vendorId
        }
      });
      return category;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }

  }

  async getAllCategoriesByVendors(id: number) {
    const vendorExist = await prisma.vendors.findFirst({ where: { id } });
    if (!vendorExist) throw CustomError.badRequest('vendor not exists');

    try {
      const categories = await prisma.product_category.findMany({ where: { vendor_id: id } });
      return categories;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

}