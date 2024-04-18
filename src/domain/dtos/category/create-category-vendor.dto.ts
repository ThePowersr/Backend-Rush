export class CreateCategoryVendorDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly image: string
  ) { }

  static create(object: { [key: string]: any }): [string?, CreateCategoryVendorDto?] {
    const { name, available = true, image } = object;
    let availableBoolean = available;

    if (!name) return ['Missing name'];
    if (typeof available !== 'boolean') {
      availableBoolean = (available === 'true');
    }

    if (!image) return ['Missing image']

    return [undefined, new CreateCategoryVendorDto(name, availableBoolean, image)];

  }
}