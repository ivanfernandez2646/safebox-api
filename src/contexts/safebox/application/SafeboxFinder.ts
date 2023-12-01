import { Inject, Injectable } from '@nestjs/common';
import { Safebox } from '../domain/Safebox';
import { SafeboxId } from '../domain/SafeboxId';
import { SafeboxNotFound } from '../domain/SafeboxNotFound';
import { SafeboxRepository } from '../domain/SafeboxRepository';

@Injectable()
export default class SafeboxFinder {
  constructor(
    @Inject(SafeboxRepository) private readonly repository: SafeboxRepository,
  ) {}

  async run(id: SafeboxId): Promise<Safebox> {
    const safebox = await this.repository.find(id);

    if (!safebox) {
      throw new SafeboxNotFound(id);
    }

    return safebox;
  }
}
