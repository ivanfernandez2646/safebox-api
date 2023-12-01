import { Module } from '@nestjs/common';
import { SafeboxController } from './safebox.controller';
import InMemorySafeboxRepository from '../../contexts/safebox/infrastructure/InMemorySafeboxRepository';
import { SafeboxRepository } from '../../contexts/safebox/domain/SafeboxRepository';
import { SafeboxService } from './safebox.service';
import SafeboxCreator from '../../contexts/safebox/application/SafeboxCreator';
import SafeboxFinder from '../../contexts/safebox/application/SafeboxFinder';
import SafeboxOpener from '../../contexts/safebox/application/SafeboxOpener';

@Module({
  imports: [],
  controllers: [SafeboxController],
  providers: [
    SafeboxService,
    SafeboxCreator,
    SafeboxOpener,
    SafeboxFinder,
    { provide: SafeboxRepository, useClass: InMemorySafeboxRepository },
  ],
})
export class SafeboxModule {}
