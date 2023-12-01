import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SafeboxModule } from './safebox/safebox.module';

@Module({
  imports: [SafeboxModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
