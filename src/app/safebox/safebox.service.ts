import { Injectable } from '@nestjs/common';
import { Safebox } from '../../contexts/safebox/domain/Safebox';
import SafeboxCreator from '../../contexts/safebox/application/SafeboxCreator';
import SafeboxFinder from '../../contexts/safebox/application/SafeboxFinder';
import { SafeboxId } from '../../contexts/safebox/domain/SafeboxId';
import { SafeboxName } from '../../contexts/safebox/domain/SafeboxName';
import { SafeboxPassword } from '../../contexts/safebox/domain/SafeboxPassword';
import SafeboxOpener from '../../contexts/safebox/application/SafeboxOpener';

@Injectable()
export class SafeboxService {
  constructor(
    private readonly creator: SafeboxCreator,
    private readonly opener: SafeboxOpener,
    private readonly finder: SafeboxFinder,
  ) {}

  async create({
    id,
    name,
    password,
  }: {
    id: SafeboxId;
    name: SafeboxName;
    password: SafeboxPassword;
  }): Promise<void> {
    return this.creator.run({ id, name, password });
  }

  async open({
    id,
    name,
    password,
  }: {
    id: SafeboxId;
    name: SafeboxName;
    password: SafeboxPassword;
  }): Promise<string> {
    const safebox = new Safebox({ id, name, password });
    return this.opener.run(safebox);
  }

  async findById(id: SafeboxId): Promise<Safebox> {
    return this.finder.run(id);
  }
}
