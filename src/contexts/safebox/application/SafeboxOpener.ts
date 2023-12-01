import { Injectable, Inject } from '@nestjs/common';
import { Safebox } from '../domain/Safebox';
import { SafeboxRepository } from '../domain/SafeboxRepository';
import { SafeboxNotFound } from '../domain/SafeboxNotFound';
import { SafeboxPassword } from '../domain/SafeboxPassword';
import { SafeboxNameNotMatch } from '../domain/SafeboxNameNotMatch';
import { SafeboxPasswordNotMatch } from '../domain/SafeboxPasswordNotMatch';

@Injectable()
export default class SafeboxOpener {
  constructor(
    @Inject(SafeboxRepository) private readonly repository: SafeboxRepository,
  ) {}

  async run({ id, name, password }: Safebox): Promise<string> {
    const safebox = await this.repository.find(id);

    if (!safebox) {
      throw new SafeboxNotFound(safebox.id);
    }

    if (!name.equalsTo(safebox.name)) {
      throw new SafeboxNameNotMatch(safebox.name);
    }

    if (
      !(await SafeboxPassword.isPasswordMatched(password, safebox.password))
    ) {
      throw new SafeboxPasswordNotMatch(password);
    }

    return id.value;
  }
}
