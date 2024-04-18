import { PrismaClient } from '@prisma/client';
import express, { Router } from 'express';

interface Options {
  port: number;
  routes: Router;
  prisma: PrismaClient;
}

export class Server {

  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly routes: Router;
  private readonly prisma: PrismaClient;

  constructor(options: Options) {
    const { port, routes, prisma } = options;
    this.port = port;
    this.routes = routes;
    this.prisma = prisma;
  }

  async start() {

    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded


    //* Routes
    this.app.use(this.routes);

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`server running on port: ${this.port}`)
    })
  }
  async close() {
    this.serverListener?.close();
  }
}