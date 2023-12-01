import { Inject, Injectable } from '@nestjs/common';
import { Safebox } from '../domain/Safebox';
import { SafeboxRepository } from '../domain/SafeboxRepository';
import { SafeboxId } from '../domain/SafeboxId';
import { SafeboxName } from '../domain/SafeboxName';
import { SafeboxPassword } from '../domain/SafeboxPassword';

@Injectable()
export default class SafeboxCreator {
  constructor(
    @Inject(SafeboxRepository) private readonly repository: SafeboxRepository,
  ) {}

  async run({
    id,
    name,
    password,
  }: {
    id: SafeboxId;
    name: SafeboxName;
    password: SafeboxPassword;
  }): Promise<void> {
    const safebox = await Safebox.create({ id, name, password });
    return this.repository.create(safebox);
  }
}
