import { PrismaClient } from "@prisma/client";
import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";


(async () => {
  main();
})();


async function main() {

  const prisma = new PrismaClient();
  await prisma.$connect()
    .then(() => console.log('conectado con exito'))
    .catch(error => console.log(error));

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
    prisma: prisma,
  });

  server.start();
}