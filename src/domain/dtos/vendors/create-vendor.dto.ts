

export class CreateVendorDto {
  private constructor(
    public readonly name: string,
    public readonly hasDelivery: boolean,
    public readonly image: string,
    public readonly time: string,
    public readonly categoriesId: number[],
    public readonly isActive: boolean,
    public readonly longitude: number,
    public readonly latitude: number,
  ) { }

  static create(object: { [key: string]: any }): [string?, CreateVendorDto?] {
    const { name, hasDelivery = true, image, time, categoriesId, isActive = true, longitude, latitude } = object;
    let hasDeliveryBoolean = hasDelivery;
    let isActiveBoolean: boolean = isActive;

    if (!name) return ['Missing name'];
    if (typeof hasDelivery !== 'boolean') {
      hasDeliveryBoolean = (hasDelivery === 'true');
    };

    if (typeof isActive !== 'boolean') {
      isActiveBoolean = (isActive === 'true');
    };

    if (!image) return ['Missing image'];
    if (!time) return ['Missing cooktime'];
    if (!categoriesId) return ['Missing or invalid categoriesId'];
    if (!longitude) return ['Missing longitude'];
    if (!latitude) return ['Missing latitude'];
    if (isNaN(parseFloat(longitude)) || isNaN(parseFloat(latitude))) return ['latitude or longitude invalid']

    const floatLongitude = parseFloat(longitude);
    const floatLatitude = parseFloat(latitude);

    const normalizedCategoriesId = categoriesId.split(',').map((id: string) => {
      const parsedId = parseInt(id.trim(), 10);
      if (isNaN(parsedId)) throw 'Invalid category ID';
      return parsedId;
    });

    return [undefined, new CreateVendorDto(name, hasDelivery, image, time, normalizedCategoriesId, isActiveBoolean, floatLongitude, floatLatitude)];

  }
}