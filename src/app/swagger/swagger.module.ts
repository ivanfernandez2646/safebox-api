// swagger.middleware.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as swaggerUi from 'swagger-ui-express';
import * as path from 'path';
import * as YAML from 'yaml';
import { readFileSync } from 'fs';

@Module({})
export class SwaggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const openApiPath = path.resolve(__dirname, 'custom-open-api.spec.yaml'),
      file = readFileSync(openApiPath, 'utf8'),
      swaggerDocument = YAML.parse(file);

    consumer
      .apply(swaggerUi.serve, swaggerUi.setup(swaggerDocument))
      .forRoutes('api');
  }
}
