import { SafeboxName } from './SafeboxName';

export class SafeboxNameNotMatch extends Error {
  constructor(name: SafeboxName) {
    super(`Safebox name not matched ${name.value}`);
  }
}
