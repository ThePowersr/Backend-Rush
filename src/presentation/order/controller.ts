import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors/custom.errors';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../../domain/dtos/orders/create-order.dto';
export class OrderController {
  constructor(
    private readonly orderrService: OrderService,
  ) { }

  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  }

  // POST
  createProduct = (req: Request, res: Response) => {
    const { user, vendorId, channel, amount } = req.body;
    const [error, createOrderDto] = CreateOrderDto.create({
      ...req.body,
      uid: user.uid,
      payloadOrder: {
        detalle: [
          {
            nombreDeUsuario: user.name,
            vendorId: parseInt(vendorId),
            channel,
            amount,
            // Todo: add the products on shopping cart
            products: {}
          }
        ]
      }
    })
  }

}