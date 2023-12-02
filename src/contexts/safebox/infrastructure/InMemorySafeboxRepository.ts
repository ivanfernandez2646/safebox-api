import { Nullable } from '../../shared/domain/Nullable';
import { Safebox } from '../domain/Safebox';
import { SafeboxId } from '../domain/SafeboxId';
import { SafeboxName } from '../domain/SafeboxName';
import { SafeboxPassword } from '../domain/SafeboxPassword';
import { SafeboxRepository } from '../domain/SafeboxRepository';

export default class InMemorySafeboxRepository implements SafeboxRepository {
  private readonly data: Safebox[] = [
    Safebox.create({
      id: new SafeboxId('dfb96de6-3ddd-420e-98b9-a90ea83cab16'),
      name: new SafeboxName('ivan'),
      password: new SafeboxPassword('abc'),
    }),
  ];

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
