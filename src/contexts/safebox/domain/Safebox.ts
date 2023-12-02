import AggregateRoot from '../../shared/domain/AggregateRoot';
import { SafeboxId } from './SafeboxId';
import { SafeboxName } from './SafeboxName';
import { SafeboxPassword } from './SafeboxPassword';

export type SafeboxPrimitives = {
  id: string;
  name: string;
  password: string;
};

export class Safebox extends AggregateRoot {
  readonly id: SafeboxId;
  readonly name: SafeboxName;
  readonly password: SafeboxPassword;

  constructor({
    id,
    name,
    password,
  }: {
    id: SafeboxId;
    name: SafeboxName;
    password: SafeboxPassword;
  }) {
    super();

    this.id = id;
    this.name = name;
    this.password = password;
  }

  static create({
    id,
    name,
    password,
  }: {
    id: SafeboxId;
    name: SafeboxName;
    password: SafeboxPassword;
  }) {
    const safebox = new Safebox({
      id,
      name,
      password: password.hashPassword(password.value),
    });

    //safebox.record()

    return safebox;
  }

  static fromPrimitives(plainData: SafeboxPrimitives): Safebox {
    const { id, name, password } = plainData;

    return new Safebox({
      id: new SafeboxId(id),
      name: new SafeboxName(name),
      password: new SafeboxPassword(password),
    });
  }

  toPrimitives(): SafeboxPrimitives {
    return {
      id: this.id.value,
      name: this.name.value,
      password: this.password.value,
    };
  }
}
