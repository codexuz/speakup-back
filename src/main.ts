import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Logger } from "@nestjs/common";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function bootstrap() {
  const logger = new Logger("Bootstrap");

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Redis and queue connections have been removed

  app.useStaticAssets(join(__dirname, "..", "uploads"), {
    prefix: "/uploads/", // so /uploads/filename.jpg works
  });

  app.enableCors({
    origin: "*", // Adjust this to your frontend URL
  }); // Enable CORS for frontend integration

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
