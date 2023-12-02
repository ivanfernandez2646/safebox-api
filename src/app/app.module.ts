import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SafeboxModule } from './safebox/safebox.module';
import { SwaggerModule } from './swagger/swagger.module';

@Module({
  imports: [SafeboxModule, SwaggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
