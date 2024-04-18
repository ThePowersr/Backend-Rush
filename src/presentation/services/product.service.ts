import prisma from "../../data/database";
import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";
import { CustomError } from "../../domain/errors/custom.errors";

export class ProductService {

  async createProduct(createProductDto: CreateProductDto) {
    const { name, available, price, description, categoriesId, vendorId } = createProductDto;

    const categoryValidationErrors = await Promise.all(
      categoriesId.map(async (id) => {
        const category = await prisma.product_category.findUnique({
          where: { id }
        });
        return category ? undefined : `Category ${id} not found`;
      })
    );

    const notFoundCategories = categoryValidationErrors.filter(Boolean);
    if (notFoundCategories.length > 0) {
      throw CustomError.badRequest(
        `Categories not found: ${notFoundCategories.join(', ')}`
      );
    };

    for (let i = 0; i < categoriesId.length - 1; i++) {
      for (let j = i + 1; j < categoriesId.length; j++) {
        const category1 = await prisma.product_category.findUnique({ where: { id: categoriesId[i] } });
        const category2 = await prisma.product_category.findUnique({ where: { id: categoriesId[j] } });

        if (!category1 || !category2 || category1.vendor_id !== category2.vendor_id) {
          throw CustomError.badRequest('Product cannot have categories from different vendors');
        }
      }
    };

    try {
      const product = await prisma.products.create({
        data: {
          name: name.trim(),
          price: price,
          available,
          description,
          vendor_id: vendorId
        }
      });
      const foundCategories = categoriesId.filter((id, index) => !categoryValidationErrors[index]);
      const productWithCategories = await Promise.all(foundCategories.map(async id => {
        const productCategory = await prisma.product_category.findUnique({ where: { id } });
        const productsByCategories = await prisma.products_by_categories.create({
          data: {
            category_name: productCategory!.name,
            category_id: productCategory!.id,
            product_name: product.name,
            product_id: product.id,
          }
        });
        return { ...productsByCategories }
      }))

      return { ...product, categoriesId: productWithCategories.map(category => category.id) };

    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getAllProductByVendors(id: number) {
    const vendorExist = await prisma.vendors.findFirst({ where: { id }, select: { id: true } });
    if (!vendorExist) throw CustomError.badRequest('vendor not exists');
    console.log(vendorExist);

    try {
      const products = await prisma.products.findMany({ where: { vendor_id: id } });
      return products;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }

  }
}