export class CreateOrderDto {
  constructor(
    public readonly order: string,
    public readonly vendorId: string,
  ) { }

}