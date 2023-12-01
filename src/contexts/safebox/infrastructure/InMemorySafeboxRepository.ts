import { Nullable } from '../../shared/domain/Nullable';
import { Safebox } from '../domain/Safebox';
import { SafeboxId } from '../domain/SafeboxId';
import { SafeboxRepository } from '../domain/SafeboxRepository';

export default class InMemorySafeboxRepository implements SafeboxRepository {
  private readonly data: Safebox[] = [];

  create(safebox: Safebox): Promise<void> {
    return new Promise((res) => {
      this.data.push(safebox);
      res();
    });
  }

  find(id: SafeboxId): Promise<Nullable<Safebox>> {
    return new Promise((res) => {
      const safebox = this.data.find((s) => s.id.equalsTo(id));
      if (!safebox) {
        res(null);
      }
      res(safebox);
    });
  }
}
