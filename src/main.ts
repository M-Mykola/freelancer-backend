import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { SWAGGER_PREFIX, PORT, HOST } from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: "*" } });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("Cats example")
    .setDescription("The cats API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_PREFIX, app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(PORT, () => {
    console.log(`Server started at: ${HOST}:${PORT}`);
    console.log(`SWAGGER document at: ${HOST}:${PORT}/${SWAGGER_PREFIX}`);
  });
}

bootstrap();
