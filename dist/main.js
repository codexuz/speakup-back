import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Logger } from '@nestjs/common';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
async function bootstrap() {
    const logger = new Logger('Bootstrap');
    const app = await NestFactory.create(AppModule);
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });
    app.enableCors({
        origin: '*',
    });
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map