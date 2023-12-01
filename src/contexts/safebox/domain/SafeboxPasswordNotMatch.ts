import { SafeboxPassword } from './SafeboxPassword';

export class SafeboxPasswordNotMatch extends Error {
  constructor(password: SafeboxPassword) {
    super(`Safebox password not matched ${password.value}`);
  }
}
