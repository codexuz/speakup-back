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
    setHeaders: (res, path) => {
      // Add CORS headers for audio files
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Range');
      res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Range');
      
      // Set proper cache control for audio files
      if (path.match(/\.(mp3|wav|ogg|m4a|webm)$/i)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000');
      }
    },
  });

  app.enableCors({
    origin: "*",
  }); // Enable CORS for frontend integration

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
