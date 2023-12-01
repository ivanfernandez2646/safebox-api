import { Nullable } from '../../shared/domain/Nullable';
import { Safebox } from './Safebox';
import { SafeboxId } from './SafeboxId';

export interface SafeboxRepository {
  create(safebox: Safebox): Promise<void>;
  find(id: SafeboxId): Promise<Nullable<Safebox>>;
}

export const SafeboxRepository = Symbol('SafeboxRepository');
