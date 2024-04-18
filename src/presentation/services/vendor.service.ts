import prisma from "../../data/database";
import { CreateVendorDto } from "../../domain/dtos/vendors/create-vendor.dto";
import { CustomError } from "../../domain/errors/custom.errors";

export class VendorService {

  async createVendor(createVendorDto: CreateVendorDto) {
    const { name, hasDelivery, image, time, isActive, longitude, latitude, categoriesId } = createVendorDto;

    // Verificar si el vendedor ya existe
    const vendorExist = await prisma.vendors.findFirst({ where: { name: name.trim() } });

    if (vendorExist) {
      throw CustomError.badRequest('Vendor already exists');
    }

    // Validar la existencia de las categorías
    const categoryValidationErrors = await Promise.all(
      categoriesId.map(async (id) => {
        const category = await prisma.category.findUnique({
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
    }

    // Crear el vendedor
    try {
      const vendor = await prisma.vendors.create({
        data: {
          name,
          has_delivery: hasDelivery,
          image,
          time,
          longitude,
          latitude,
          is_active: isActive
        }
      });

      // Crear las relaciones con las categorías válidas
      const foundCategories = categoriesId.filter((id, index) => !categoryValidationErrors[index]);
      await Promise.all(foundCategories.map(async (id) => {
        await prisma.category.findUnique({
          where: {
            id
          }
        });
        await prisma.categories_vendors.create({
          data: {
            categories_id: id,
            vendors_id: vendor.id
          }
        });
      }));

      // Retornar el vendedor creado
      return { ...vendor };

    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getAllVendor() {
    try {
      const allVendors = await prisma.vendors.findMany()
      const vendorWithCategories = await Promise.all(
        allVendors.map(async (vendor) => {
          const categories = await prisma.categories_vendors.findMany({
            where: { vendors_id: vendor.id },
            select: { categories_id: true },
          });
          return {
            ...vendor,
            categoriesId: categories.map(category => category.categories_id)
          }
        })
      );
      return vendorWithCategories;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

}
