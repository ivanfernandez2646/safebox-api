import { SafeboxId } from './SafeboxId';

export class SafeboxNotFound extends Error {
  constructor(id: SafeboxId) {
    super(`Safebox with id ${id.value} not found`);
  }
}
