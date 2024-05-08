
import { Channel } from '@prisma/client';

export class CreateOrderDto {
  constructor(
    public readonly uid: string,
    public readonly vendorId: number,
    public readonly payloadOrder: {
      detalle: [
        {
          nombreDeUsuario: string,
          vendorId: number,
          channel: Channel,
          amount: number,
          products: {
            productId: number,
            amount: number
          }[]
        }
      ]
    },
    public readonly channel: Channel,
    public readonly amount: number,
  ) { }

  static create(object: { [key: string]: any }): [string?, CreateOrderDto?] {

    const { uid, vendorId, payloadOrder, channel, amount } = object;

    let amountNumber = amount;

    if (!uid) return ['Missing uid'];
    if (!payloadOrder) return ['Missing payload'];
    if (!channel) return ['Missing channel'];
    if (!amount) return ['Missing amount'];
    if (typeof amount !== 'number') {
      amountNumber = parseFloat(amount);
    };
    if (isNaN(parseInt(vendorId))) return ['vendorId is invalid'];

    const vendorIdNumber = parseInt(vendorId);

    return [undefined, new CreateOrderDto(uid, vendorIdNumber, payloadOrder, channel, amountNumber)];
  }

}