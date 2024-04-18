

export class CreateProductDto {
  constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly categoriesId: number[],
    public readonly vendorId: number,
  ) { }

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, available = true, price, description, categoriesId, vendorId } = object;
    let availableBoolean = available;
    let priceNumber = price;

    if (!name) return ['Missing name'];
    if (typeof available !== 'boolean') {
      availableBoolean = (available === 'true');
    };

    if (!price) return ['Missing price'];
    if (isNaN(parseFloat(price))) return ['price is invalid'];
    if (typeof price !== 'number') {
      priceNumber = parseFloat(price);
    };

    if (!description) return ['Missing description'];
    if (!categoriesId) return ['Missing or invalid categoriesId'];

    const normalizedCategoriesId = categoriesId.split(',').map((id: string) => {
      const parsedId = parseInt(id.trim(), 10);
      if (isNaN(parsedId)) throw 'Invalid category ID';
      return parsedId;
    });

    if (isNaN(parseInt(vendorId))) return ['vendorId is invalid'];

    const vendorIdNumber = parseInt(vendorId);

    return [undefined, new CreateProductDto(name, availableBoolean, priceNumber, description, normalizedCategoriesId, vendorIdNumber)];
  }
}