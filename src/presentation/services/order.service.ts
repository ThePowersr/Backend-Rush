import prisma from '../../data/database';
import { CreateOrderDto } from '../../domain/dtos/orders/create-order.dto';
import { CustomError } from '../../domain/errors/custom.errors';
export class OrderService {

  async createOrder(createOrderDto: CreateOrderDto) {

    const { uid, amount, channel, payloadOrder, vendorId } = createOrderDto;

    const vendorExist = await prisma.vendors.findFirst({ where: { id: vendorId } });
    if (!vendorExist) throw CustomError.badRequest('Vendor not exist');

    try {
      const order = await prisma.orders.create({
        data: {
          amount,
          channel,
          payload_order: payloadOrder,
          uid,
          vendor_id: vendorId
        }
      });
      return order;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }

  }

}