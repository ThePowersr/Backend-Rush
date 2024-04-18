export class CreateProductCategoryDto {

  constructor(
    public readonly name: string,
    public readonly image: string,
    public readonly available: boolean,
    public readonly vendorId: number,
  ) { }

  static create(object: { [key: string]: any }): [string?, CreateProductCategoryDto?] {

    const { name, image, available, vendorId } = object;
    let availableBoolean = available;

    if (!name) return ['Missing name'];
    if (!image) return ['Missing image'];
    if (!vendorId) return ['Missing vendorId'];
    if (typeof available !== 'boolean') {
      availableBoolean = (available === 'true');
    };
    if (isNaN(parseInt(vendorId))) return ['vendorId is invalid'];

    const vendorIdNumber = parseInt(vendorId);

    return [undefined, new CreateProductCategoryDto(name, image, availableBoolean, vendorIdNumber)];
  }

}